import { Resend } from "resend";
import type { ContactFormData } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, projectType, message } = data;

  await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL as string,
    subject: `New message from ${name} — ${projectType}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #060608; color: #e2e4ec; padding: 40px; border-radius: 12px;">
        
        <div style="margin-bottom: 32px;">
          <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 8px; color: #63ffb4;">
            New Portfolio Message
          </h1>
          <p style="color: #5a6070; margin: 0; font-size: 14px;">
            Someone reached out through your portfolio contact form.
          </p>
        </div>

        <div style="background: #101018; border: 1px solid rgba(99,255,180,0.2); border-radius: 10px; padding: 24px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #5a6070; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #e2e4ec; font-size: 13px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #5a6070; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); color: #63ffb4; font-size: 13px;">
                <a href="mailto:${email}" style="color: #63ffb4; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #5a6070; font-size: 13px;">Project Type</td>
              <td style="padding: 10px 0; color: #e2e4ec; font-size: 13px;">
                <span style="background: rgba(99,255,180,0.1); border: 1px solid rgba(99,255,180,0.3); padding: 3px 10px; border-radius: 50px; font-size: 12px; color: #63ffb4;">${projectType}</span>
              </td>
            </tr>
          </table>
        </div>

        <div style="background: #101018; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 24px; margin-bottom: 32px;">
          <p style="color: #5a6070; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Message</p>
          <p style="color: #e2e4ec; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #63ffb4; color: #060608; border-radius: 50px; font-weight: 700; font-size: 14px; text-decoration: none;">
          Reply to ${name} →
        </a>

        <p style="color: #5a6070; font-size: 12px; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
          Sent from your portfolio at sahilarate.dev
        </p>
      </div>
    `,
  });
}