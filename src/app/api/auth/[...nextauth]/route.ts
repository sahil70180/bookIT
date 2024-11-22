import dbConnect from "@/backend/config/dbConnect";
import User, { IUser } from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/ErrorHandler";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

type Credentials = {
  email: string;
  password: string;
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    pages: {
      signIn: "/login",
    },
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
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      //for sign in
      async signIn({ user, account, profile, email, credentials }) {
        try {
          if (account?.provider !== "credentials") {
            // if user is using open Auth
            await dbConnect();

            // find the user in DB
            const findUser = await User.findOne({
              email: user?.email,
            });
            if (findUser) {
              return true;
            }

            // else create a user in DB
            const newUser = await User.create({
              name: user?.name,
              email: user?.email,
              avatar: user?.image,
              authType: account?.type,
              provider: account?.provider,
            });
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error in Sign In", error);
          return false;
        }
      },
      jwt: async ({ token, user, account }) => {
        // console.log("===============");
        // console.log("Token in jwt : ", token);
        // console.log("user in jwt : ", user);
        // console.log("================");

        user && (token.user = user); // merge user with token
        //TODO -- also update the session when user is updated

        return token;
      },
      session: async ({ session, user, token }) => {
        // console.log("session : ", session);
        // console.log("Token in session : ", token);
        // console.log("user in session : ", user);

        session.user = token.user as IUser;

        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
