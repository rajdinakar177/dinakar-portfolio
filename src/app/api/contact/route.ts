import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { connectToDatabase } from "@/lib/mongodb";
import { Lead } from "@/models/lead";
import {
  sendLeadNotification,
  BrevoConfigError,
  BrevoRequestError,
} from "@/lib/brevo";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form for errors.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { hpToken, ...lead } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but skip writing to the database or sending an email.
  if (hpToken) {
    return NextResponse.json({ ok: true });
  }

  // 1. Persist the lead. This is the durable record — if it fails, the
  //    whole request fails, since there'd be nothing to show up later in
  //    a leads dashboard even if the notification email went out fine.
  let notificationFailed = false;
  let leadId: string;
  try {
    await connectToDatabase();
    const created = await Lead.create({ ...lead, notificationFailed: false });
    leadId = created._id.toString();
  } catch (error) {
    console.error("[contact] Failed to save lead to MongoDB:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }

  // 2. Best-effort admin notification. If this fails, the lead is still
  //    safely stored — log it and flag the record instead of failing the
  //    whole request, so a Brevo outage never loses a lead.
  try {
    await sendLeadNotification(lead);
  } catch (error) {
    notificationFailed = true;

    if (error instanceof BrevoConfigError) {
      console.error("[contact] Brevo is not configured:", error.message);
    } else if (error instanceof BrevoRequestError) {
      console.error("[contact] Brevo request failed:", error.message);
    } else {
      console.error("[contact] Unexpected notification error:", error);
    }

    try {
      await Lead.findByIdAndUpdate(leadId, { notificationFailed: true });
    } catch (updateError) {
      console.error(
        "[contact] Failed to flag notificationFailed on lead:",
        updateError
      );
    }
  }

  return NextResponse.json({ ok: true, notificationFailed });
}