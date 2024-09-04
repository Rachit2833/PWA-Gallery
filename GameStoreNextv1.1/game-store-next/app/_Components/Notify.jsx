import { getSubjects } from "../_Lib/getSubjects";
import Notification from "./Notification";
const getCurrentDateFormatted = () => {
   const date = new Date();
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
   const day = String(date.getDate()).padStart(2, '0');

   return `${year}-${month}-${day}`;
}
function dateDifference(date1, date2) {
   const firstDate = new Date(date1);
   const secondDate = new Date(date2);
   const differenceInMilliseconds = Math.abs(firstDate - secondDate);
   const millisecondsInOneDay = 24 * 60 * 60 * 1000;
   const differenceInDays = Math.ceil(differenceInMilliseconds / millisecondsInOneDay);

   return differenceInDays;
}
async function Notify() {
   let assNoti = []
   const subjects = await getSubjects()
   let notification = subjects.filter((item) => {
      return item.Class === "CSE_2";
   })
   notification.map((item) => {
      assNoti = assNoti.concat(item.Assignment)
         .filter((item) => {
            const currentDate = getCurrentDateFormatted()
            return dateDifference(item.AssignedDate, currentDate) < 7
         })
   })
   return (
      <>
      {assNoti.map((item, index) => (
            <Notification item={item} key={index} />
         ))
      }
      </>
   )
}

export default Notify
