import { getExtraClasses } from "../_Lib/getExtraClasses";
import { getTimeTable } from "../_Lib/getTimeTable";
import TableTeachers from "./TableTeachers"
function formatDate(date) {
   const d = new Date(date);
   const month = (d.getMonth() + 1).toString().padStart(2, "0");
   const day = d.getDate().toString().padStart(2, "0");
   const year = d.getFullYear();

   return `${year}-${month}-${day}`;
}
function getCurrentDay() {
   const currentDate = new Date().getDay() % 7;
   const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];
   return daysOfWeek[currentDate];
}
async function TeachMain({ setClass, checkedClasses, setCheckedClasses, pastClasses, setIsSubjectSelected}) {
   const day = getCurrentDay();
   let classes = await getTimeTable(day);
   classes = classes.filter((data) => data.Teachers.id === 12);

   let extraClasses = await getExtraClasses();
   extraClasses = extraClasses.filter(
      (data) => data.Teacher === 12 && data.Date === formatDate(new Date())
   );
   return (
      <>
         <TableTeachers setClass={setClass} checkedClasses={checkedClasses} setCheckedClasses={setCheckedClasses}  setIsSubjectSelected={setIsSubjectSelected} pastClasses={pastClasses} extraClasses={extraClasses} classes={classes} />
       
      </>
   )
}

export default TeachMain
