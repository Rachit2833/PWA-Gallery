'use client'
import CircularProgression from "./CircularProgression";

function countClasses(record) {
   const totalKeys = Object.keys(record).length;
   const nonClassKeys = ["id", "student_id", "Assignment1", "Assignment2", "Assignment3", "Assignment4", "Assignment5"]; // List of known non-class keys
   let classCount = totalKeys;

   // Subtract the number of non-class keys
   for (const key of nonClassKeys) {
      if (record.hasOwnProperty(key)) {
         classCount--;
      }
   }

   return classCount;
}
function Subject({ attendance,data }) {
  
   function countPresentClasses(record) {
      let presentCount = 0;
      const classPattern = /^\d{4}-\d{2}-\d{2}_.+$/; // Regex to match YYYY-MM-DD_ClassPattern

      for (const key in record) {
         if (classPattern.test(key) && record[key] === 'present') {
            presentCount++;
         }
      }

      return presentCount;
   }


   const getNameWithTwoWords = (name) => {
      if (!name) return '';
      const words = name.split(' ');
      return words.slice(0, 2).join(' ');
   };
   const enData = data.EnrolledDetails.filter((item)=>{
      return item.studentId===1
   })
   console.log(enData);

   return (
      <div style={{ position: "relative" }} className={`${data?.Tag} `}>
         <span className="material-icons-sharp">{data?.icon}</span>
         <h3 >{getNameWithTwoWords(data?.Name)}</h3>
         <h2>{countPresentClasses(attendance[0])}/{countClasses(attendance[0])}</h2>
         <div style={{margin:"1rem 0"}} className="progress">
            <div>
            <CircularProgression value={((countPresentClasses(attendance[0]) / countClasses(attendance[0])) * 100).toPrecision(3)}  />
         </div>
         </div>
         <small style={{ position: "absolute", bottom: "1rem" }} className="text-muted">Last 24 Hours</small>
      </div>
   );
}

export default Subject;