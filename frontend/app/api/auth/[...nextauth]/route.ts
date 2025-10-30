import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// ===============================
// 🔹 NextAuth cấu hình chính
// ===============================
export const authOptions: AuthOptions = {
  providers: [
    // --- Google Login ---
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // --- Facebook Login ---
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // --- Tài khoản website (credentials) ---
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        await dbConnect();

        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // ✅ Return user info
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          provider: "credentials",
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth", // Trang login tuỳ chỉnh
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // ✅ Gắn id & provider vào JWT token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user as any).id;
        token.provider = account?.provider || (user as any).provider || "credentials";
      }
      return token;
    },

    // ✅ Đưa id & provider vào session user
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },

    // ✅ Tự thêm user mới vào DB nếu login bằng Google / Facebook
    async signIn({ user, account }) {
      await dbConnect();
      if (account?.provider === "google" || account?.provider === "facebook") {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            username: user.name,
            email: user.email,
            password: "",
            provider: account.provider,
          });
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
