"use client";

import { useState } from "react";
import { Suspense } from "react";
import MiniTimetable from "./MiniTimetable";
import Loader from "./Loader";
import Controls from "./Controls";

function TimetableWrapper() {
   const [dayMutator, setDayMutator] = useState(0);

   const currentDate = new Date();
   currentDate.setDate(currentDate.getDate() + dayMutator);
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const day = currentDate.getDate();
   const month = monthNames[currentDate.getMonth()];
   const formattedDate = `${day} ${month}`;
   return (
      <Controls setDayMutator={setDayMutator} dayMutator={dayMutator} formattedDate={formattedDate}
         childrens={
            <Suspense fallback={<Loader />}>
               <MiniTimetable expanded={true} dayMutator={dayMutator} date={formattedDate} />
            </Suspense>
         }
      ></Controls>
   );
}

export default TimetableWrapper;