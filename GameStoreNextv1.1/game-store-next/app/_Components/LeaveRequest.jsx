'use client'

import { useState } from "react";
import DropMenu from "./DropMenu";
import { updateLeaveRequest } from "../_Lib/updateLeaveRequest";



function LeaveRequest({data}) {
   const [isLeaveMenu,setIsLeaveMenu]=useState(false)
   return (
      <>
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
               Leave Requests
            </h2>
            <div style={{ position: "relative" }}>
               <span style={{ fontSize: "1.8rem" }} onClick={() => {
                  setIsLeaveMenu(!isLeaveMenu);
               }}>
                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
               </span>
               {isLeaveMenu && (
                  <div style={{ position: "absolute", border: "1px solid  rgba(132, 139, 200, 0.18) ", boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)", top: "2rem", zIndex: "10", right: "0", padding: "1rem", borderRadius: "15px",backgroundColor:"white" }}>
                     <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                        <DropMenu data="Accept All"  icon="checkmark-outline" />
                        <DropMenu data="Reject All" icon="close-sharp" />
                     </ul>
                  </div>
               )}
            </div>
         </div>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
               <tr>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                     Student Name
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>
                    Subject
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>Date</th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>Day</th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}>Time
                
                  </th>
                  <th style={{ padding: "0.5rem", textAlign: "center" }}></th>
               </tr>
                {data.filter((item)=>{
                  console.log(item);
                   return item.Status ==="Applied"
                }).map((item)=>{
                  return <>
                      <tr style={{borderBottom:"1px solid black"}} >
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>Alex Jones</td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>{item.NewTimeTable.subject}</td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                           {item.Date}
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                            {item.NewTimeTable.day}
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                          {item.NewTimeTable.time}
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                           <button onClick={() => {
                              updateLeaveRequest(item.id, "Rejected")
                           }} style={{border:"0",color: "white",padding: "0.5rem 1rem",borderRadius: "25px",backgroundColor:"red"}}>Reject</button>
                           
                        </td>
                        <td style={{ padding: "0.5rem", textAlign: "center" }}>
                           <button onClick={()=>{
                              updateLeaveRequest(item.id,"Accepted")
                           }} style={{ border: "0", color: "white", padding: "0.5rem 1rem", borderRadius: "25px", backgroundColor: "green" }}>Accept</button>

                        </td>
                        
                     </tr>
                     
                     </>
                })}
               
            </tbody>
          
         </table>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin:"2rem 0" }}>
            <h2>No Leave Request</h2>
         </div>
      </>
   )
}

export default LeaveRequest
