import prisma from '@/lib/db';
import { getSession } from '@/lib/session';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user;

      if (!email) {
        return false;
      }

      try {
        let newUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!newUser) {
          newUser = await prisma.user.create({
            data: {
              email,
              username: name!,
              profileImg: image,
              password: '',
            },
          });
        }

        const sessionData = { id: newUser.id };
        const session = await getSession();

        if (session) {
          session.id = sessionData.id;
          await session.save();
        }
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
