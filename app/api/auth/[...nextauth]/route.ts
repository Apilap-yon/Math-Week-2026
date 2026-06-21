import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email || "";
        return email.endsWith("@lsp.ac.th");
      }
      return false;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
});

export { handler as GET, handler as POST };
