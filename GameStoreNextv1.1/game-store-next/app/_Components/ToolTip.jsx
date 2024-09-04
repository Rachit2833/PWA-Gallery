"use client"
import "@/app/_Styles/notification.css"
import { useState } from "react"
function ToolTip({todayCount,tomorrowCount}) {
    const [tooltip,setToolTip]=useState(false)
   return (
      <li onMouseEnter={() => {
         setToolTip(true)
      }}
        onMouseLeave={()=>{
         setToolTip(false)
        }}
       >
         <div class="tooltip-container">
            {todayCount>0?<span style={{ display: `${tooltip ? "inline" : "none"}` }} class="tooltip">{todayCount} assignment due today</span>:null}
            {tomorrowCount>0 ? <span style={{ display: `${tooltip ? "inline" : "none"}`, top:`${todayCount >= 1 ? "-80px":"-39px"}`} } class="tooltip ">{tomorrowCount} assignment due tomorrow</span> :null}
            <span class="text"></span>
         </div>
      </li>

   )
}

export default ToolTip
