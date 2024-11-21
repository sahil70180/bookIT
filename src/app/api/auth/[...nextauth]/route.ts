import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

type Credentials = {
  email: string;
  password: string;
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        //@ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new ErrorHandler("User Not Found with this email", 400);
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new ErrorHandler("Wrong password entered", 400);
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        console.log("===============");
        console.log("Token in jwt : ", token);
        console.log("user in jwt : ", user);
        console.log("================");
        // user && (token.user = token); // merge user with token
        if (user) {
          token.user = {
            //@ts-ignore
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            //@ts-ignore
            role: user.role,
            //@ts-ignore
            createdAt: user.createdAt,
            //@ts-ignore
            avatar: user?.avatar,
          };
        }

        //TODO -- also update the session when user is updated

        return token;
      },
      session: async ({ session, user, token }) => {
        console.log("session : ", session);
        console.log("Token in session : ", token);
        session.user = token.user as IUser;

        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
