import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@/app/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await sql`
            INSERT INTO users (
              google_id,
              name,
              email,
              image
            )
            VALUES (
              ${account.providerAccountId},
              ${user.name},
              ${user.email},
              ${user.image}
            )
            ON CONFLICT (google_id)
            DO UPDATE SET
              name = EXCLUDED.name,
              email = EXCLUDED.email,
              image = EXCLUDED.image,
              last_login_at = NOW()
          `;

          console.log("User saved:", user.email);

        } catch (error) {
          console.error("Failed to save user:", error);
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
