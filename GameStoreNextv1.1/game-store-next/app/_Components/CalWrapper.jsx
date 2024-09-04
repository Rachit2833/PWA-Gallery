'use client';
import Modal from "@/app/_Components/Modal.jsx";
import { Inter } from "next/font/google";
import { useState } from "react";
import AssignmentForm from "./AssignmentForm.jsx";
import Calendar from "./BigCalender";
import ClassForm from "./ClassForm";
import DropMenu from "./DropMenu";
import EventForm from "./EventForm";

const inter = Inter({
   subsets: ["latin"]
});

const getDaySuffix = (day) => {
   if (day >= 11 && day <= 13) return 'th';
   switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
   }
};

const coolBrightColors = [
   "#EF5A6F", "#AFEEEE", "#ADD8E6",
   "#87CEFA", "#87CEEB", "#00BFFF", "#B0C4DE", "#1E90FF",
   "#6495ED", "#4682B4", "#5F9EA0", "#7FFFD4", "#40E0D0",
   "#48D1CC", "#00CED1", "#20B2AA", "#66CDAA", "#8FBC8F",
   "#3CB371", "#2E8B57", "#9ACD32", "#6B8E23", "#556B2F"
];

const monthNames = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

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

const CalWrapper = ({ classes, events, extraClasse }) => {
   const fullDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const [currentDate, setCurrentDate] = useState(new Date());
   const [isModalActive, setIsModalActive] = useState(false);
   const [modalType, setModalType] = useState(null);
   const [fromDate, setFromDate] = useState(null);
   const [toDate, setToDate] = useState(null);
   const [dropMenu, setDropMenu] = useState(false);

   const handleOpenModal = (type) => {
      setModalType(type);
      setIsModalActive(true);
      setDropMenu(false);
   };
   
 
  
return (
   <>
  
      <main style={{height:"100%"}} className={inter.className}>
         {isModalActive && (
            <Modal type={modalType} isactiveModal={isModalActive} setIsActiveModal={setIsModalActive} currentDate={currentDate}>
               {modalType === "Class" && <ClassForm setIsActiveModal={setIsModalActive} currentDate={currentDate} />}
               {modalType === "Event" && <EventForm setIsActiveModal={setIsModalActive} fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />}
               {modalType === "Assignment" && <AssignmentForm  setIsActiveModal={setIsModalActive} currentDate={currentDate} />}
            </Modal>
         )}
         <Calendar fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} extraClasse={extraClasse} events={events} classes={classes} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </main>

        <div style={{}} className="right">
         <button
            className="btn"
            disabled={isModalActive}
            onClick={() => setDropMenu(!dropMenu)}
            style={{
               height: "3rem",
               backgroundColor: "royalblue",
               color: "white",
               marginLeft:"12rem",
               marginTop:"1rem"
               
            }}
         >
            Schedule Event
         </button>

         {dropMenu && (
            <div style={{
               position: "absolute",
               border: "1px solid rgba(132, 139, 200, 0.18)",
               boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
               top: "10rem",
               right: "0",
               zIndex: "10",
               padding: "1rem",
               borderRadius: "15px",
               backgroundColor: "white"
            }}>
               <DropMenu data="Schedule Class" onClick={() => handleOpenModal("Class")} />
               <DropMenu data="Schedule Event" onClick={() => handleOpenModal("Event")} />
               <DropMenu data="Add Assignment" onClick={() => handleOpenModal("Assignment")} />
               <DropMenu data="Cancel Event/Class" />
            </div>
         )}

         <div  style={{
            height:"40rem",
            padding: "1rem",
            border: "1px solid rgba(132, 139, 200, 0.18)",
            borderRadius: "15px",
            boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
            overflow:"auto"
         }}>
            <h2>
               Events for {currentDate.getDate()} {monthNames[currentDate.getMonth()]}
            </h2>

            {classes.map((item, index) => {
               if (item.day === fullDay[new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getDay()] && item.Teacher === 12) {
                  return (
                     <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} key={index}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                           <h2 style={{ color: item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : coolBrightColors[(index + 2) % 25] }}>{item.type}</h2>
                           <span style={{ fontSize: "1rem" }}>{item.time}</span>
                        </div>
                        <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                           <h3>{item.subject} (Data Structures And Algorithm)</h3>
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber}</h3>
                              <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                           </div>
                        </div>
                     </div>
                  );
               }
            })}
            {events.map((item, index) => {
               if (isDateInRange(currentDate, item.StartDate, item.EndDate)) {
                  return (
                     <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} key={index}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                           <h2 style={{ color: `${coolBrightColors[(index + 3) % 25] || "royalBlue"} `, borderRadius: "50%" }}>{item.Event}</h2>
                           <span style={{ fontSize: "1rem" }}>{item.Time}</span>
                        </div>
                        <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                           <p>{item.Description}</p>
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber ? item.roomNumber : "Seminar Hall"}</h3>
                              <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                           </div>
                        </div>
                     </div>
                  );
               }
            })}
            {extraClasse.map((item, index) => {
               if (item.Date === formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))) {
                  return (
                     <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} key={index}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                           <h2 style={{ color: item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : coolBrightColors[(index + 2) % 25] }}>{item.type}</h2>
                           <span style={{ fontSize: "1rem" }}>{item.time}</span>
                        </div>
                        <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                           <h3>{item.subject} (Data Structures And Algorithm)</h3>
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber}</h3>
                              <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                           </div>
                        </div>
                     </div>
                  );
               }
            })}
         </div>
      </div>
    
   </>
);

};

export default CalWrapper;