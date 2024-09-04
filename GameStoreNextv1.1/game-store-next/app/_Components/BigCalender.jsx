import React, { useState } from 'react';

import DropMenu from './DropMenu';

const isLeapYear = (year) => {
   return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};
const coolBrightColors = [
  "#EF5A6F", "#AFEEEE", "#ADD8E6",
   "#87CEFA", "#87CEEB", "#00BFFF", "#B0C4DE", "#1E90FF",
   "#6495ED", "#4682B4", "#5F9EA0", "#7FFFD4", "#40E0D0",
   "#48D1CC", "#00CED1", "#20B2AA", "#66CDAA", "#8FBC8F",
   "#3CB371", "#2E8B57", "#9ACD32", "#6B8E23", "#556B2F"
];
const daysInMonth = (year, month) => {
   return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
function formatDate(date) {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
}
function isDateInRange(date, startDate, endDate) {
   const targetDate = formatDate(date);
   const start = formatDate(startDate);
   const end = formatDate(endDate);
   return targetDate >= start && targetDate <= end;
}







const Calendar = ({ currentDate, setCurrentDate, classes, events, extraClasse, fromDate, setFromDate, toDate, setToDate }) => {
   const [isSelectedYear, setIsSelectedYear] = useState(false);
   const currentDay = new Date().getDate();
   const currentMonth = new Date().getMonth();
   const currentYear = new Date().getFullYear();
   const fullDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   let minYear = 1970
   let maxYear = new Date().getFullYear()
   let eCount=0
   const nextMonth = () => {

     setFromDate((previous)=>{
         setFromDate(previous)
     });
      let newYear = currentDate.getFullYear();
      let newMonth = currentDate.getMonth() + 1;
      if (newMonth > 11) {
         newMonth = 0;
         newYear += 1;
      }
      setCurrentDate(new Date(newYear, newMonth, 1));
   };

   const prevMonth = () => {
      let newYear = currentDate.getFullYear();
      let newMonth = currentDate.getMonth() - 1;
      if (newMonth < 0) {
         newMonth = 11;
         newYear -= 1;
      }
      setCurrentDate(new Date(newYear, newMonth, 1));
   };

   const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
   ];

   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
   const totalDays = daysInMonth(currentDate.getFullYear(), currentDate.getMonth());

   const daysArray = [];
   for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push({ type: 'empty', key: `empty-${i}` });
   }
   for (let i = 1; i <= totalDays; i++) {
      daysArray.push({ type: 'day', key: i, value: i });
   }

   return (
      <>
         <div onClick={()=>{
            setFromDate(null)
            setToDate(null)
         }} style={{ display: "flex", alignItems: "center", marginBottom: "1rem", margin: "2rem 0", position: "relative" }}>
            <h2 style={{fontSize:"2rem"}}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <span onClick={() => setIsSelectedYear(!isSelectedYear)} style={{ fontSize: "2.2rem", margin: "0 2rem" }}>
               <ion-icon name="chevron-down-outline"></ion-icon>
            </span>
            {isSelectedYear && (
               <div style={{ position: "absolute", border: "1px solid rgba(132, 139, 200, 0.18)", boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)", top: "2rem", zIndex: "1000", left: "10rem", padding: "1rem", borderRadius: "15px", backgroundColor: "white", height: "20rem", overflow: "auto" }}>
                  <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                     {Array.from({ length: maxYear - minYear + 1 }, (_, index) => (
                        <li onClick={(e) => {
                           setCurrentDate(new Date(e.target.value, currentDate.getMonth(), currentDate.getDate()))
                           setIsSelectedYear(false)

                        }} className={`yearlist ${maxYear - index === currentDate.getFullYear() ? "yearlistSelected" : null} `} value={maxYear - index} key={index}>{maxYear - index}</li>
                     ))}
                  </ul>
               </div>
            )}
            <div style={{ position: "absolute", right: "0rem" }}>
               <button style={{ height: "3rem", width: "3rem", backgroundColor: "royalblue", color: "white", marginLeft: "1rem" }} onClick={prevMonth}>◀︎</button>
               <button style={{ height: "3rem", width: "3rem", backgroundColor: "royalblue", color: "white", marginLeft: "1rem" }} onClick={nextMonth}>▶︎</button>
            </div>
         </div>
         <div className="timetable" style={{
            border: "1px solid rgba(132, 139, 200, 0.18)", display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1rem", textAlign: "center", padding: "1rem"
         }}>
            {dayNames.map((day, index) => (
               <h2 key={index}>{day}</h2>
            ))}
            {daysArray.map((day, dayIndex) => {
               if (day.type === 'empty') {
                  return <div key={day.key}  className="day empty"></div>;
               } else {
                  let bgColor ;
                  let hasSingleDayEvent = false;
                  let multiDayEventCount = 0;
                  let multiDayEvents = [];
                  let count=0
                  events.forEach((event, index) => {
                       count =index
                     if (isDateInRange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value), event.StartDate, event.EndDate)) {
                        if (new Date(event.StartDate).toDateString() === new Date(event.EndDate).toDateString()) {
                           hasSingleDayEvent = true;             
                        } else {
                           multiDayEventCount++;
                           multiDayEvents.push(event);
                           bgColor = event.Type !== "Fullday"  ? bgColor : bgColor? bgColor :(event.type === "Lecture" ? "royalblue" : event.type === "Tutorial" ? "#FFF455" : coolBrightColors[index+3 % 25])  
                        }
                     }
                  });
                 
                  return (
                  
                     <div key={day.key} onDoubleClick={()=>{
                        if (fromDate === null) {
                           setFromDate(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)))
                        }
                        else if (formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)) < fromDate && toDate) {
                           setFromDate(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)))
                        }
                        else if (formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)) < fromDate && !toDate) {
                           setToDate(fromDate)
                           setFromDate(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)))
                        }
                        else {
                           setToDate(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)))
                        }
                     }} className={`day hov ${fromDate && toDate && !isDateInRange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value), fromDate, toDate) ? "gray" : ""
                        } ${currentDate.getDate() === day.value ? "selected" : ""}`} onClick={() => {
                        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value));
                     }} style={{

                        width: "100%", height: "6rem", margin: "auto 0", padding: "0.5rem", display: "flex", alignItems: "start", flexDirection: "column", fontSize: "1.6rem", fontWeight: "800", borderRadius: "15px", boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
                        border: "1px solid rgba(132, 139, 200, 0.18)", position: "relative", backgroundColor: isDateInRange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value), fromDate, toDate) ? "#D6EFD8": bgColor
                     }}>
                        {day.value }
                        {hasSingleDayEvent && (
                           <div className="dot" style={{ marginLeft:"1.5rem",position: "absolute", top: "1rem", left: "3rem", height: "1rem", width: "1rem", backgroundColor: coolBrightColors[count+3%25], borderRadius: "50%" }}></div>
                        )}
                        {multiDayEventCount > 1 && multiDayEvents.map((event, index) => {
                           const startDate = new Date(event.StartDate);
                           const endDate = new Date(event.EndDate);
                           const startDayIndex = daysArray.findIndex(d => d.value === startDate.getDate());
                           const endDayIndex = daysArray.findIndex(d => d.value === endDate.getDate());
                           const gridColumnStart = (startDayIndex % 7) + 1;
                           const gridColumnEnd = (endDayIndex % 7) + 2;

                           return (
                            <>
                                 <div key={index} className="multi-day-bar" style={{
                                    gridColumn: `${gridColumnStart} / ${gridColumnEnd}`, gridRow: `${Math.floor(dayIndex / 7) + 2}`, height: "1rem", backgroundColor:  (event.type === "Lecture" ? "royalblue" : event.type === "Tutorial" ? "#FFF455" : coolBrightColors[index+7 % 25]), borderRadius: "15px",
                                    display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "0.8rem", fontWeight: "bold", position: "absolute", top: "3.75rem", left: "0", right: "0"
                                 }}>
                                    {event.Event}
                                 </div>
                                 {multiDayEventCount > 2 && (
                                    <div className="multi-day-count" style={{ position: "absolute", top: "4.5rem", left: "0.5rem", borderRadius: "5px", padding: "0.2rem 0.5rem", fontSize: "0.8rem",overflow:"auto" }}>
                                       +{multiDayEventCount - 2} events
                                    </div>
                                 )}
                            </>
                           );
                     
                        })}
                        
                        {classes.map((item, index) => {
                           if (item.day === fullDay[new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value).getDay()] && item.Teacher === 12) {
                              return (
                                 <div key={index} className="dot" style={{ position: "absolute", top:"1rem" , left: `3rem`,zIndex:"100", height: "1rem", width: "1rem", backgroundColor: `${item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : "#59D5E0"}`, borderRadius: "50%" }}></div>
                              );
                           }
                           return null;
                        })}

                        {extraClasse.map((item, index) => {
                          
                           if (item.Date === formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day.value)) && item.Teacher === 12 ) {
                        
                              return (
                                 <>
                                 <div key={index} className="dot" style={{ margin:`0 1rem`,position: "absolute", top: "1rem", left: "3rem", height: "1rem", width: "1rem", backgroundColor: `${item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : "#59D5E0"}`, borderRadius: "50%" }}></div>
                                   
                                 </>
                              );
                           }
                           return null;
                        })}
                        {day.value === currentDay && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() && (
                           <h1 style={{ zIndex: "100", fontSize: "1rem", color: "black" }}>Today</h1>
                        )}
                     </div>
                  );
               }
            })}
         </div>
      </>
   );
};

export default Calendar;