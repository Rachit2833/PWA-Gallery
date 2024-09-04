
import { Inter } from "next/font/google";
import { getSubjects } from "../_Lib/getSubjects";
import TeacherSubSlide from "./TeacherSubSlide";
const inter = Inter({
   subsets: ["latin"]
})
async function AllSubSlide() {
   const subjects =await getSubjects()
   return (
      <div className="subs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "2rem" }}>
         {subjects.filter((item) => {
            return item.Teacher === 12;
         }).map((item, index) => {
            return <TeacherSubSlide index={index} data={item} key={index} />
         })}
      </div>
   )
}

export default AllSubSlide
