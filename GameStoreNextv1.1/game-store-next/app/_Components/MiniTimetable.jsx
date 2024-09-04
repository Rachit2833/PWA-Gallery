import { lazy } from "react";
import { getTimeTable } from "../_Lib/getTimeTable";
import MiniTableSlide from "./MiniTableSlide";

function getCurrentDay(add) {
   add =add===null|| add===undefined?0:add
   const currentDate = (new Date().getDay() + add)%7
   const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
   return daysOfWeek[currentDate];
   // daysOfWeek[currentDate];
}
async function MiniTimetable({ expanded, dayMutator,date }) {
   const day = getCurrentDay(dayMutator);
   const classes = await getTimeTable(day);
   return (
      <div className="table" style={{ display: "grid", gridTemplateRows: "auto", gap: "1rem" }}>
         <div style={{
            display: "grid",
            fontSize: "1rem",
            gridTemplateColumns: expanded ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 0.5fr",
            alignItems: "center",
            padding: "0.5rem",
            gap: "0.5rem"
         }}>
            <div><b>Time</b></div>
            <div><b>Room</b></div>
            <div><b>Subject</b></div>
            <div><b>Type</b></div>
            {expanded ? <div><b>Details</b></div> : <div></div>}
         </div>
         { classes?.map((data, index) => {
            return <MiniTableSlide expanded={expanded} key={index} classItem={data} />
         }

          )}
        {classes?.length!==0?null:<p>No classes? Scheduled for {dayMutator===0?"Today":date} till now</p>}
      </div>
   );
}

export default MiniTimetable;