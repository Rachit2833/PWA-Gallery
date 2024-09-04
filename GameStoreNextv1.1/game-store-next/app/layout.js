import "@/app/_Styles/global.css";
import { Inter } from "next/font/google";
import { lazy } from "react";
import { AppProvider } from "./_Lib/AppProvider";
import Header from "./_Components/Header";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { auth, signOut } from "./_Lib/auth";
import { useSignOut } from "./_Lib/actions";
import { getTeachersInd } from "./_Lib/getTeachers";
import { getStudent } from "./_Lib/getStudent";
// const Profile = lazy(() => import("./_Components/Profile")); 
import Profile from "./_Components/Profile";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  const session = await auth();
  const teacher =session?.user?.TeacherId? await getTeachersInd(session.user.email):null
  const student =session?.user?.TeacherId? await getStudent(session.user.email):null
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preload" href="./_Lib/Supabase" />
        <link rel="preload" href="./_Lib/getSubjects" />
        <link rel="preload" href="../_Lib/getAnnouncements" />
        <link rel="preload" href="../_Lib/getTimeTable" />
        <link rel="preload" href="../_Lib/getTeachersLeave" />
        <Script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></Script>
        <Script
          nomodule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></Script>
      </head>
      <body className={inter.className}>
        <Toaster />
        <AppProvider>

            <Header auth={session}>
              <form action={useSignOut}>
                <a href="#">
                  <span className="material-icons-sharp">logout</span>

                  <button style={{ backgroundColor: "white", border: "0" }}>
                    <h3> Logout</h3>
                  </button>
                </a>
              </form>
            </Header>
    
          <div className={` container`}>
 <Profile session={session} data={teacher} />
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
