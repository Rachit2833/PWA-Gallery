'use client'
import Image from "next/image";
import { useAppContext } from "../_Lib/AppProvider";
import { usePathname } from "next/navigation"; // Import the usePathname hook

function Profile({ session,data }) {
   const provider = useAppContext();
   const { sideProfile, setSideProfile } = provider;

   const pathname = usePathname(); // Get the current path
   console.log(data,"data here");
  

   return (
      <aside className={`${sideProfile ? "active" : ""}`}>
         <div className="profile">
            <div className="top">
               <div className="profile-photo" style={{ position: "relative" }}>
                  <Image fill style={{objectFit:"cover"}} src={session?.user?.image} alt="" />
               </div>
               <div className="info">
                  <p>Hey, <b>{session?.user?.name.split(" ")[0]}</b></p>
                  <small className="text-muted">{session?.user?.TeacherId} {session?.user?.Designation}</small>
               </div>
            </div>
            <div className="about">
               <h5>{session?.user?.Designation === "Teacher" ?"Department":"Course"}</h5>
               <p>{session?.user?.Designation === "Teacher" ? data[0]?.Department :"Computer Science & Engineering"}</p>
               <h5>{session?.user?.Designation === "Teacher" ?"Designation": "DOB"}</h5>
               <p>{session?.user?.Designation === "Teacher" ?data[0]?.Designation: "DOB"}</p>
               <h5>{session?.user?.Designation === "Teacher" ? "Authority" : "Contact"}</h5>
               <p>{session?.user?.Designation === "Teacher" ? data[0].Authority : "Contact no"}</p>
               <h5>Email</h5>
               <p>{session?.user?.email}</p>
               <h5>Address</h5>
               <p>Ghost town Road, New York, America</p>
            </div>
         </div>
      </aside>
   );
}

export default Profile;