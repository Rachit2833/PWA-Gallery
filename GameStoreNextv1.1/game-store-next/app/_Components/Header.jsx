'use client'
import Image from "next/image"
import { Children, useState } from "react"
import { useAppContext } from "../_Lib/AppProvider";
import { usePathname } from "next/navigation";
import logo  from "../../public/logo.png"
function Header({children,auth}) {
   
   const provider = useAppContext()
   const { sideProfile, setSideProfile, alertPanel, setAlertPanel }=provider
   const [isDarkTheme, setIsDarkTheme] = useState(false);
   const toggleTheme = () => {const rootElement = document.documentElement;rootElement.classList.toggle("dark-theme");setIsDarkTheme(!isDarkTheme);};
   const pathname = usePathname(); // Get the current path

   // // Hide the Profile component if on the login page
   // if (pathname === "/login") {
   //    return null;
   // }
   return (
      <header>
         <div className="logo" title="University Management System">
            <Image src={logo} alt="University Logo" width={50} height={50} />
            <h2>U<span className="danger">M</span>S</h2>
         </div>
         <div className="navbar">
            <a href="index.html" className="active">
               <span className="material-icons-sharp">home</span>
               <h3>Home</h3>
            </a>
            <a href="timetable.html" onClick={() => timeTableAll()}>
               <span className="material-icons-sharp">today</span>
               <h3>Time Table</h3>
            </a>
            {children}
         </div>
         <div id="profile-btn">
            <span style={{ marginRight:"2rem" }} onClick={()=>{
               setSideProfile(!sideProfile)
            }} className="material-icons-sharp">person</span>
            <span style={{ marginRight: "2rem" }}  onClick={() => {
               setAlertPanel(!alertPanel)
            }} className="material-icons-sharp">computer</span>
         </div>
         <div className="theme-toggler" onClick={toggleTheme}>
            <span className={`material-icons-sharp ${!isDarkTheme ?  'active' : ''}`}>light_mode</span>
            <span className={`material-icons-sharp ${ isDarkTheme ?  'active' : ''}`}>dark_mode</span>
         </div>
      </header>
   )
}

export default Header
