"use client"
import "@/app/_Styles/profile.css";
import Image from "next/image";
import profile from "@/public/im.jpeg";
import profilePicture from "@/public/abc.jpg"
import Social from "./Social";
import { useRouter } from "next/router";
import Link from "next/link";

function ProfileCard({ data }) {
   console.log(data);
   return (
      <div
       
         className="profile-card-container"
         style={{
            margin: "2rem 0",
            display: "flex",
            justifyContent: "space-evenly",
            minHeight: "15rem",
         }}
      >
         <div className="profile-card">
            <div className="card-text">
               <div className="portada" style={{ position: "relative", minWidth: "12rem" }}>
                  <Image
                     style={{ objectFit: "cover" }}
                     fill
                     src={ profilePicture}
                     alt=""
                  />
                  <div className="avatar">
                     <Image
                        style={{ objectFit: "cover", borderRadius: "50%", zIndex: "10" }}
                        fill
                        src={ profilePicture}
                        alt=""
                     />
                  </div>
               </div>
               <div className="title-total">
                  <div className="title">
                     <li>{data.Authority}</li>
                     <li>{data.Designation}</li>
                     </div>
                  <h2 style={{ color: "royalblue",marginTop:"1rem " }}>{data.Name}</h2>
                  <div style={{ color: "royalblue"}} className="desc">
                     <p style={{ marginBottom: "1rem" }}>{data.Description.slice(0, 120)}<Link href={`/store/${data.Department}/${data.id}`} style={{ color: "blue" }}> more</Link></p>
                  
                  </div>
                  <div className="actions" style={{position:"absolute",bottom:"1rem",marginTop:""}}>
                     <Social item={data} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProfileCard;