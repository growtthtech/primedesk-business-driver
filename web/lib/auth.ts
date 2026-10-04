import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { sendEmail } from "./email";

const database = {
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
  type: "postgres" as const,
};

export const auth = betterAuth({
  database,
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await sendEmail(
          email,
          "Your PrimeDesk login code",
          `<div style="font-family:Arial"><h2>Your PrimeDesk code: ${otp}</h2><p>It expires in 10 minutes. If you didn't ask, ignore this.</p></div>`
        );
      },
      otpLength: 6,
      expiresIn: 600, // 10 minutes
    }),
  ],
});
