import Link from "next/link";
import { submitAssignment } from "../_Lib/actions";
import { useState } from "react";

function AssignmentUpload({ item, index, Assdata, data, }) {
   const [inputData, setInputData] = useState()
   const assignmentSubmittedDate = Assdata[0][`Assignment${index + 1}`]!==null ? Assdata[0][`Assignment${index + 1}`]?.submittedDate : null;
   const assignmentStatus = Assdata[0][`Assignment${index + 1}`] !== null ? Assdata[0][`Assignment${index + 1}`]?.status || "Not Submitted"  : "Not Submitted";
   console.log(Assdata[0][`Assignment${index + 1}`],Assdata[0][`Assignment${index + 1}`]?.url,assignmentStatus,assignmentSubmittedDate);
   return (
      <form action={submitAssignment}>
         <div className={`assignment-container ${assignmentStatus === "Submitted" ? "submitted" : ""}`}>
            <div className="assignment-details">
               <span className="assignment-topic">
                  <Link href={item.Url}>
                     <i className="download">{index + 1} - {item.Topic}</i>
                  </Link>
               </span>
               {assignmentStatus === "Submitted" ? (
                  <span className="assignment-status">
                     <Link href={Assdata[0][`Assignment${index + 1}`]?.url} target="_blank" rel="noopener noreferrer">
                        <i className="download">Submitted</i>
                     </Link>
                  </span>
               ) : (
                  <input value={data.Name} className="input_Ass" type="text" name="Subject" id="" />
               )}
               <span className="assignment-date">
                  <b>{assignmentStatus === "Submitted" ? "Sub:" : "Due:"}</b>{assignmentStatus !== "Submitted" ? item.dueDate : assignmentSubmittedDate}
               </span>
            </div>
            {assignmentStatus !== "Submitted" && (
               <div className="assignment-actions">
                  <input value={`Assignment${index + 1}`} className="input_Ass" type="text" name="Assignment_No" id="" />
                  <div className={`container-btn-file ${inputData ? "has-file" : ""}`}>
                     Upload File
                     <input
                        className="file"
                        name="AssignmentFile"
                        type="file"
                        onChange={(e) => {
                           setInputData(e.target.files[0]);
                        }}
                     />
                  </div>
                  <button className="submit-btn">Submit</button>
               </div>
            )}
         </div>
      </form>
   );
}

export default AssignmentUpload;