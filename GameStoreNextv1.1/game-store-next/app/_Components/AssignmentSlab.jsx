
import { getStudentList } from "../_Lib/getAttendance";
import { getSubjectsInd } from "../_Lib/getSubjects";
import AllAssignment from "./AllAssignment";
import PlusIcon from "./PlusIcon";

async function AssignmentSlab({sub}) {
   let assignmentData = await getSubjectsInd(sub);
   let studentList = await getStudentList(sub.replace(/ /g, '_'));
   let newData = assignmentData[0].Assignment;

   // Generate the random array to fill the remaining slots
   const randomArray = Array.from({ length: 5 - newData.length }, () => Math.floor(Math.random() * 100));

   return (
      <div>
         <h2 style={{ margin: "2rem 0" }}>Active Assignments</h2>
         <div className="subs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "2rem" }}>
            {newData.map((item, index) => (
               <AllAssignment
                  studentList={studentList}
                  enData={studentList}
                  key={index}
                  data={item}
                  index={index}
               />
            ))}
            {/* Map over the random array to fill remaining slots */}
            {randomArray.map((item, index) => (
                (
                  <div key={index}
                     className=""
                     style={{
                        boxSizing: "border-box",
                        height: "12rem",
                        width: "100%",
                        borderRadius: "15px",
                        padding: "1rem",
                        boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
                        border: "1px solid  rgba(132, 139, 200, 0.18) ",

                     }}
                  >
                     <div style={{ display: "grid", gridTemplateRows: "0.3fr 1fr", height:"100%"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", height: "3rem" }}>
                           <h2 style={{ fontSize: "1.4rem", }}>0{index + newData.length + 1 }</h2>
                           <h2 style={{ fontSize: "1.4rem", }}><ion-icon name="ellipsis-vertical-outline"></ion-icon></h2>
                        </div>
                      <PlusIcon />
                  </div>
               </div>
               )
            ))}
         </div>
      </div>
   );
}

export default AssignmentSlab;