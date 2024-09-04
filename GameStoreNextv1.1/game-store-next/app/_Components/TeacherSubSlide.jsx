'use client'

import { useRouter } from "next/navigation"


function TeacherSubSlide({ data, index,}) {
   const ColorArray = ["lightblue","#B95CF4", "#9CDBA6", "#FD9B63"]
   const router = useRouter()
   return (
      <div onClick={()=>{
         router.push(`/orders/${data.Name}`)
      }}
         className="box"
         style={{
            height: "8rem",
            width: "100%",
            backgroundColor: ColorArray[index], 
            borderRadius: "15px",
            padding:"1rem",
            boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
            border: "1px solid  rgba(132, 139, 200, 0.18) ",
         }}
      >
         <h3 style={{ fontSize: "1.2rem", color: "white" }}>{data.Name}</h3>
         
      </div>
   )
}

export default TeacherSubSlide