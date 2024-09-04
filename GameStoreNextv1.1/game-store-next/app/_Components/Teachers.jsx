import { lazy } from "react";
import { getTeachersLeave } from "../_Lib/getTeachersLeave";
const TeacherLeave = lazy(() => import("./TeacherLeave")) 

async function Teachers() {
   const teacherOnLeave = await getTeachersLeave();
   return (teacherOnLeave?.map((item ,index)=>{
      return <TeacherLeave key={index} data={item} />
   }) )
}

export default Teachers
