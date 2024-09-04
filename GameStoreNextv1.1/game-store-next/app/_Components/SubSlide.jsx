import { getAttendance } from "../_Lib/getAttendance";
import { getSubjects } from "../_Lib/getSubjects";
import Subject from "./Subject";
function replaceSpacesWithUnderscores(str) {
   str = str.toString();
   return str.replace(/ /g, "_");
}
async function SubSlide() {
   const subjects = await getSubjects()
   
   return (
      <div className="subjects">
         {subjects?.map(async (item, index) => {
            const attendance = await getAttendance(replaceSpacesWithUnderscores(item.Name), 12345678);
            return <Subject attendance={attendance} key={index} data={item} />
         })}
      </div>
   )
}

export default SubSlide
