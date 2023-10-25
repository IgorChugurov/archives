import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();

        try {
          // const user = await User.findOne({
          //   email: credentials.email,
          // });
          // console.log(user);
          // if (user) {
          //   const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          //   if (isPasswordCorrect) {
          //     return user.toObject();
          //   } else {
          //     throw new Error("Wrong Credentials!");
          //   }
          // } else {
          //   throw new Error("User not found!");
          // }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return Promise.resolve(url);
    },
    async jwt({ token, user }) {
      console.log("token", token);
      console.log("user", user);
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session", session);
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  // session: {
  //   strategy: "jwt",
  //   maxAge: 60 * 60 * 24 * 7, // 7 days
  // },

  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("token", token);
  //     console.log("user", user);
  //     if (user) {
  //       return { ...token, ...user };
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     if (token) {
  //       session.user = token;
  //     }
  //     return session;
  //   },
  // },
};
