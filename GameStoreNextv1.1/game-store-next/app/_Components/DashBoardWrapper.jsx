"use client"
import TableTeachers from "./TableTeachers";
import { useState } from "react";
import AttendanceSlide from "./AttendanceSlide";
import { useSearchParams } from "next/navigation";
import { uploadAttendance } from "../_Lib/uploadAttendance";
import { addAttendance } from "../_Lib/addAttendance";
import { syncClasses } from "../_Lib/actions";
import { updateConcludedClasses } from "../_Lib/uploadConcludedClasses";



function DashBoardWrapper({ children,type,studentList, subjects, leave, classes, extraClasses, pastClasses, transformedSubject }) {
   const [isSubjectSelected, setIsSubjectSelected] = useState();
   const [checkedClasses, setCheckedClasses] = useState([]);
   const [attendanceData, setAttendanceData] = useState([]);
   const [isClass, setClass] = useState();
   const searchParams = useSearchParams();
   console.log(studentList[1].student_id ===Number("12345678"),studentList,"  hj hvhbjkhh");
   const handleAttendanceChange = (studentId, status) => {
      setAttendanceData(prevData => {
         const existingEntry = prevData.find(entry => entry.studentId === studentId);
         if (existingEntry) {
            return prevData.map(entry => entry.studentId === studentId ? { studentId, status } : entry);
         } else {
            return [...prevData, { studentId, status }];
         }
      });
   };

   function formatDate(date) {
      const d = new Date(date);
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      const year = d.getFullYear();

      return `${year}-${month}-${day}`;
   }

   return (

      <>
       

            {isSubjectSelected ? (
               <div
                  className="one"
                  style={{
                     gridRow: "span 2",
                     borderRadius: '15px',
                     boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
                     border: '1px solid rgba(132, 139, 200, 0.18)',
                     padding: '1rem',
                     overflow: "auto",
                     height: '41rem'
                  }}
               >
                  <button className="btn" onClick={() => {
                     setIsSubjectSelected(false);
                  }}>Back</button>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                     <thead>
                        <tr>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Roll Number</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Name</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Time</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Type</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Present</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Leave</th>
                           <th style={{ padding: '0.5rem', textAlign: 'center' }}>Absent</th>
                        </tr>
                     </thead>
                     <tbody>
                        {studentList?.map((item, index) => {
                           return <AttendanceSlide
                              data={item}
                              key={index}
                              leave={leave}
                              onAttendanceChange={handleAttendanceChange}
                           />
                        })}
                     </tbody>
                  </table>
                 <form style={{position:"relative",padding:"2rem"}} action={syncClasses}>
                     <button style={{position:"absolute",right:"6rem",bottom:"-1rem"}} className="btn" onClick={async () => {
                        const Dates = formatDate(new Date())
                        const columnName = `${Dates}_${type}`
                        await addAttendance(transformedSubject, columnName, "text")
                        attendanceData.map(async (item) => {
                          await uploadAttendance( item, columnName, transformedSubject)
                        })
                        await updateConcludedClasses(isClass)
                        setClass()
                        setIsSubjectSelected(false)
                     }}>Submit</button>
                  <button style={{ position: "absolute", bottom: "-1rem", right: "-1rem", backgroundColor: "white", color:"#7380ec" }} className="btn" 
                  >Cancel</button>
                 </form>
               </div>
            ) : (
               <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
                  <TableTeachers setClass={setClass} checkedClasses={checkedClasses} setCheckedClasses={setCheckedClasses} isSubjectSelected={isSubjectSelected} setIsSubjectSelected={setIsSubjectSelected} pastClasses={pastClasses} extraClasses={extraClasses} classes={classes} />

                  {children}
                   

               </div>
            )}
        

      </>

   );
}

export default DashBoardWrapper;