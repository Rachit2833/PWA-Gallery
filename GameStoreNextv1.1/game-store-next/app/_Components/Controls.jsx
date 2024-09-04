"use client"

import { useState } from "react"

function Controls({ childrens, setDayMutator, dayMutator, formattedDate }) {

   return (
      <>
         <div className="controls" >
            <span onClick={()=>{
               setDayMutator(dayMutator-1)
            }} id="prevDay">&lt;</span>
            <h2>{dayMutator===0?"Today's":formattedDate} Timetable</h2>
            <span onClick={() => {
               setDayMutator(dayMutator + 1)
            }} id="nextDay">&gt;</span>
         </div>
         {childrens }
       </>
   )
}

export default Controls
