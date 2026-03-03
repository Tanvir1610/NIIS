import nodemailer from 'nodemailer';

function getTransporter() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        console.warn('SMTP not configured. Emails will be logged to console.');
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

interface ConfirmationEmailData {
    name: string;
    email: string;
    participantId: string;
    participantType: string;
    amount: number;
    track?: string | null;
    paperTitle?: string | null;
}

/**
 * Send a payment confirmation email to the participant.
 * Falls back to console.log if SMTP is not configured.
 */
export async function sendConfirmationEmail(data: ConfirmationEmailData): Promise<boolean> {
    const from = process.env.SMTP_FROM || 'noreply@niis2026.com';

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e40af, #7c3aed); color: #fff; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 8px 0 0; opacity: 0.9; }
    .body { padding: 32px; }
    .badge { display: inline-block; background: #1e40af; color: #fff; padding: 8px 20px; border-radius: 24px; font-weight: 600; font-size: 18px; margin-bottom: 24px; }
    .info-grid { border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
    .info-row { display: flex; border-bottom: 1px solid #e5e5e5; }
    .info-row:last-child { border-bottom: none; }
    .info-label { background: #f9fafb; padding: 12px 16px; font-weight: 600; width: 40%; color: #374151; font-size: 14px; }
    .info-value { padding: 12px 16px; width: 60%; color: #1f2937; font-size: 14px; }
    .footer { background: #f9fafb; padding: 24px 32px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e5e5; }
    .success-icon { font-size: 48px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NIIS 2026</h1>
      <p>International Conference on Integrated and Intelligent Systems</p>
    </div>
    <div class="body">
      <div style="text-align: center; margin-bottom: 24px;">
        <div class="success-icon">✅</div>
        <h2 style="color: #059669; margin: 0;">Payment Confirmed!</h2>
      </div>
      <p>Dear <strong>${data.name}</strong>,</p>
      <p>Your registration for NIIS 2026 has been confirmed. Here are your details:</p>
      <div style="text-align: center; margin: 24px 0;">
        <div class="badge">${data.participantId}</div>
      </div>
      <div class="info-grid">
        <div class="info-row">
          <div class="info-label">Participant ID</div>
          <div class="info-value">${data.participantId}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Name</div>
          <div class="info-value">${data.name}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Type</div>
          <div class="info-value" style="text-transform: capitalize;">${data.participantType}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Amount Paid</div>
          <div class="info-value">₹${data.amount.toLocaleString('en-IN')}</div>
        </div>
        ${data.track ? `<div class="info-row"><div class="info-label">Track</div><div class="info-value">${data.track}</div></div>` : ''}
        ${data.paperTitle ? `<div class="info-row"><div class="info-label">Paper Title</div><div class="info-value">${data.paperTitle}</div></div>` : ''}
      </div>
      <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #1e40af;">
        <p style="margin: 0; color: #1e40af; font-weight: 600;">📅 Conference Dates: December 15-17, 2026</p>
        <p style="margin: 8px 0 0; color: #374151; font-size: 14px;">Please keep this email for your reference. Present your Participant ID at the registration desk.</p>
      </div>
    </div>
    <div class="footer">
      <p>NIIS 2026 | GCET, Greater Noida</p>
      <p>For queries: registration@niis2026.com</p>
    </div>
  </div>
</body>
</html>`;

    const mailOptions = {
        from,
        to: data.email,
        subject: `NIIS 2026 — Registration Confirmed (${data.participantId})`,
        html,
    };

    const transporter = getTransporter();

    if (!transporter) {
        console.log('=== EMAIL (SMTP not configured, logging instead) ===');
        console.log(`  To: ${data.email}`);
        console.log(`  Subject: ${mailOptions.subject}`);
        console.log(`  Participant ID: ${data.participantId}`);
        console.log('====================================================');
        return true;
    }

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.error('Failed to send confirmation email:', err);
        return false;
    }
}
