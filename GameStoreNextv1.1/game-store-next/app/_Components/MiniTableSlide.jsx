'use client'
import { lazy, useState } from "react";
import Link from "next/link";
import ExtendButton from "./ExtendButton";
import { useAppContext } from "../_Lib/AppProvider";
import ToolTip from "./ToolTip";
function MiniTableSlide({ classItem, expanded,children }) {

  let countToday = 0
  let countTomorrow = 0
  const provider =useAppContext()
  const { dateDifference, getCurrentDateFormatted }=provider
  const [expandedRows, setExpandedRows] = useState(false);
  const abc = classItem.Subjects?.Assignment;
  classItem.Subjects?.Assignment?.forEach((item) => {
    const currentDate = getCurrentDateFormatted();
    if (currentDate === item.dueDate) {
      countToday++;
    } else if (dateDifference(currentDate, item.dueDate) === 1) {
      countTomorrow++;
    }
  });
  return (
    <>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: expanded ? "1fr 1fr 1fr 1fr 1fr" : "1fr 1fr 1fr 1fr 0.5fr",
          height: "2.8rem",
          gap: "0.5rem",
          alignItems: "center",
          transition: "height 0.3s ease",
        }}
      >
      
        <li>{classItem.time}</li>
        <li>{classItem.roomNumber}</li>
        <li>{classItem.Subjects.Name}</li>
        <li>{classItem.type}</li>
        {children}
        {countToday > 0 && !expanded || countTomorrow > 0 && !expanded  ?<ToolTip todayCount={countToday} tomorrowCount={countTomorrow} />:null}
        {expanded && classItem ? <ExtendButton isExpanded={expandedRows} setExpand={setExpandedRows} />:null}
      </div>
      {expandedRows && (
        <>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "1rem", marginTop: "0.5rem" }}>
            <table style={{ width: "90%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>Instructor/Faculty</th>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>{classItem.Teachers.Name}</td>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>{classItem.Teachers.Authority} ({classItem.Teachers.Department})</td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>Subject</th>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>{classItem.Subjects?.Name}</td>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>Open Elective 1</td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>Grading/Credits</th>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>{classItem.Subjects?.Credits}</td>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>Minimum {classItem.Subjects ? classItem.Subjects?.PassPercentage : "40"}% to Pass</td>
                </tr>
                <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center", verticalAlign: "top", border: "1px solid black" }}>Assignment</th>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                      <li><b>Assigned</b></li>
                      {abc?.map((item, index) => {

                        return <li style={{ textDecoration: "underline" ,margin:"0.5rem 0" }} key={index}> <Link href={item?.Url}><i>{item?.Topic}</i></Link></li>;
                      })}
                    </ul>
                  </td>
                  <td style={{ padding: "0.5rem", textAlign: "center", border: "1px solid black" }}>
                    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                      <li><b>Submitted</b></li>
                      {abc?.map((item, index) => {
                        return <li style={{ textDecoration: "underline", margin: "0.5rem 0", color:"green" }} key={index}> <Link href={item?.Url}><i>Submitted</i></Link></li>;
                      })}

               
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h1>Leave Application</h1>
          <div style={{ marginTop: "1rem", paddingRight: "1rem" }}>
            {/* Ext Area */}
            <div style={{ width: "90%", margin: "0 auto" }}>
              <textarea
                rows="4"
                style={{ color: "blue", width: "100%", padding: "0.5rem", fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
                placeholder="Enter your reason for your absence"
              ></textarea>
            </div>
            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button style={{ margin: "2rem", padding: "0.5rem 1rem", fontSize: "1rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Submit
              </button>
            </div>
          </div>
          
        </>
      )}
    </>
  );
}

export default MiniTableSlide