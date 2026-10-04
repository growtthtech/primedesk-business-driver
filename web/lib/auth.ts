import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";

const database = {
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
  type: "postgres" as const,
};

// Sends the 6-digit login code. Real email when ZeptoMail is configured,
// otherwise prints to the server terminal (local pilot mode).
async function sendCode(email: string, otp: string) {
  const key = process.env.ZEPTOMAIL_API_KEY;
  const from = process.env.ZEPTOMAIL_FROM;
  if (!key || !from) {
    console.log(`[PrimeDesk PILOT] Login code for ${email}: ${otp} (add ZEPTOMAIL_API_KEY to email it for real)`);
    return;
  }
  await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Zoho-encapi ${key}` },
    body: JSON.stringify({
      from: { address: from, name: "PrimeDesk" },
      to: [{ email_address: { address: email } }],
      subject: "Your PrimeDesk login code",
      htmlbody: `<div style="font-family:Arial"><h2>Your PrimeDesk code: ${otp}</h2><p>It expires in 10 minutes. If you didn't ask, ignore this.</p></div>`,
    }),
  });
}

export const auth = betterAuth({
  database,
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await sendCode(email, otp);
      },
      otpLength: 6,
      expiresIn: 600, // 10 minutes
    }),
  ],
});
