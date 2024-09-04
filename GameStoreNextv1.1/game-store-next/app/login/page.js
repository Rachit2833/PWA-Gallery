import Image from "next/image";
import SignInButton from "../_Components/SignInButton";
import imgs from "@/public/logo.png"
function page() {
   return (
     <main style={{ gridColumn: " span 3", marginTop: "0",}}>
       <div></div>
       <div class="change-password-container" >
         <Image  style={{height:"8rem",width:"8rem",objectFit:"cover",margin:"0 auto"}} src={imgs} alt="" />
         <div class="signin">
           <h2 class="headingx">Sign in to access your account</h2>
           <SignInButton page="student" />
         </div>
       </div>
     </main>
   );
}

export default page
