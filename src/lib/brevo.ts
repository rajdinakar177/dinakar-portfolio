/**
 * Minimal Brevo (formerly Sendinblue) transactional email client.
 *
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 *
 * Requires BREVO_API_KEY and BREVO_SENDER_EMAIL in the environment (see
 * .env.example). The sender address must be a verified sender in your
 * Brevo account, or the API will reject the request.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export class BrevoConfigError extends Error {}
export class BrevoRequestError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}

type LeadNotificationInput = {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the admin a notification email for a new contact-form lead.
 * Throws BrevoConfigError if required env vars are missing, or
 * BrevoRequestError if Brevo rejects the request — callers should catch
 * both and respond to the client accordingly.
 */
export async function sendLeadNotification(lead: LeadNotificationInput) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !senderEmail || !adminEmail) {
    throw new BrevoConfigError(
      "Missing BREVO_API_KEY, BREVO_SENDER_EMAIL, or ADMIN_EMAIL in the environment."
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ...(lead.company ? ([["Company", lead.company]] as [string, string][]) : []),
    ...(lead.projectType
      ? ([["Project type", lead.projectType]] as [string, string][])
      : []),
    ...(lead.budget ? ([["Budget", lead.budget]] as [string, string][]) : []),
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#71717A;white-space:nowrap;"><strong>${escapeHtml(
          label
        )}</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const htmlContent = `
    <div style="font-family:sans-serif;font-size:14px;color:#18181B;">
      <h2 style="margin:0 0 16px;">New portfolio lead</h2>
      <table cellpadding="0" cellspacing="0">${htmlRows}</table>
      <p style="margin:16px 0 4px;color:#71717A;"><strong>Message</strong></p>
      <p style="white-space:pre-wrap;margin:0;">${escapeHtml(lead.message)}</p>
    </div>
  `;

  const textLines = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    lead.message,
  ];

  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "Portfolio Contact Form" },
      to: [{ email: adminEmail }],
      replyTo: { email: lead.email, name: lead.name },
      subject: `New lead: ${lead.name}${lead.projectType ? ` — ${lead.projectType}` : ""}`,
      htmlContent,
      textContent: textLines.join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new BrevoRequestError(
      `Brevo API request failed (${res.status}): ${body}`,
      res.status
    );
  }
}
