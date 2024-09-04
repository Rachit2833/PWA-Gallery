import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getStudent } from "./getStudent";
import { createUser } from "./createUser";
import { getTeachersInd } from "./getTeachers";

function generateUniqueCode() {
  const code = Math.floor(10000000 + Math.random() * 90000000);
  return code.toString();
}

const authConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async authorized({ auth, request }) {
      return auth?.user ? true : false;
    },
    async signIn({ user, account, profile }) {
      try {
        console.log("Checking if user exists...");
        const existingUser = await getStudent(user.email);
        const existingTeacher = await getTeachersInd(user.email);

        if (existingUser?.length === 0 && existingTeacher?.length === 0) {
          const newData = {
            Name: user.name,
            Email: user.email,
            Course: "BTech.Computer Science And Engineering",
            StudentId: generateUniqueCode(),
          };
          await createUser(newData);
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in process:", error);
        return false;
      }
    },
    async session({ session, user }) {
      const existingUser = await getStudent(session.user.email);
      const existingTeacher = await getTeachersInd(session.user.email);

      if (existingTeacher?.length > 0) {
        session.user.TeacherId = existingTeacher[0].id;

        session.user.Designation = "Teacher";
      }

      // Check if existingUser is not empty
      else if (existingUser?.length > 0) {
        session.user.StudentId = existingUser[0].StudentId;

        session.user.Designation = "Student";
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
