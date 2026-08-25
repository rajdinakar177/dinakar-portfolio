import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * A lead captured from the contact form. Stored in MongoDB in addition
 * to (not instead of) the Brevo admin notification email — the email is
 * for immediate awareness, this collection is the durable record you
 * can query, filter, and update status on.
 */
const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 100 },
    projectType: { type: String, trim: true, maxlength: 100 },
    budget: { type: String, trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["new", "contacted", "won", "lost"],
      default: "new",
    },
    /** Set to true if the admin notification email failed to send. */
    notificationFailed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

export type LeadDocument = InferSchemaType<typeof leadSchema>;

/**
 * Next.js dev mode hot-reloads modules, which would otherwise redefine
 * this model on every edit and throw "OverwriteModelError". Reusing an
 * already-registered model avoids that.
 */
export const Lead: Model<LeadDocument> =
  (mongoose.models.Lead as Model<LeadDocument>) ??
  mongoose.model<LeadDocument>("Lead", leadSchema);