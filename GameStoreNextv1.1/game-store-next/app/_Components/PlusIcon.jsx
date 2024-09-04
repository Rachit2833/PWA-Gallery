"use client"

import { useRouter } from "next/navigation"

function PlusIcon() {
   const router = useRouter()
   return (
      <div>
         <div onClick={()=>{
            router.push("/terms")
         }} style={{ display: "flex", justifyContent: "center", }}>
            <h2 style={{ fontSize: "4rem" }}><ion-icon name="add-circle-outline"></ion-icon></h2>
         </div>
      </div>
   )
}

export default PlusIcon
