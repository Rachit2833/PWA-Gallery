"use client"
import { Line } from 'rc-progress';
function AllAssignment({enData,data,index,studentList}) {
   const abc =  enData.filter((data)=>{
      return data[`Assignment${index + 1}`]?.status ==="Submitted"
   }).length

   const ColorArray = ["lightblue", "#B95CF4", "#9CDBA6", "#FD9B63"]
   return (
      <div
         className=""
         style={{
            boxSizing:"border-box",
            height: "12rem",
            width: "100%",
            borderRadius: "15px",
            padding: "1rem",
            boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
            border: "1px solid  rgba(132, 139, 200, 0.18) ",

         }}
      >
         <div style={{display:"grid",gridTemplateRows:"1fr 1fr" ,}}>
            <div style={{ display: "flex", justifyContent: "space-between",height:"3rem" }}>
               <h2 style={{ fontSize: "1.4rem", }}>0{index+1}</h2>
               <h2 style={{ fontSize: "1.4rem", }}><ion-icon name="ellipsis-vertical-outline"></ion-icon></h2>
            </div>
            <div>
                  <h3>{data.Topic}</h3>
                  <h3>DueDate: {data.dueDate}</h3>
            </div>
            <div style={{margin:"1rem 0"}}>
               <span>{abc}/{studentList.length}</span>
               <Line percent={abc/studentList.length*100} strokeWidth={4} strokeColor="green" />
            </div>
        
            
         </div>
            

      </div>
   )
}

export default AllAssignment
