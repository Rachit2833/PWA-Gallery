import { getClassAttendance } from "../_Lib/getSubjectAttendance";
import { getSubjects } from "../_Lib/getSubjects";
import Course from "./Course";


async function SubjectSlide() {
   const Tag = ["mth", "cs", "cg", "net", "architecture"];
   const subjects = await getSubjects()
   function replaceBlankWithUnderscore(input) {
      return input.replace(/ /g, '_');
   }
   return (
      <>
   

         {subjects?.map(async (data, index) => {
            let  submittedData = await getClassAttendance(replaceBlankWithUnderscore(data.Name))
            return <Course key={index} data={data} tag={Tag[index]} submittedData={submittedData} />;
         })}


        
      </>
   )

}

export default SubjectSlide
