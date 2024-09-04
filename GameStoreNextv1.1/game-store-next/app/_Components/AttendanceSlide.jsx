import { useState } from "react";

function AttendanceSlide({ data, leave, onAttendanceChange }) {
   const [selectedOption, setSelectedOption] = useState("");

   const handleRadioChange = (e) => {
      const value = e.target.value;
      setSelectedOption(value);
      onAttendanceChange(data.Student.StudentId, value);
   };

   const radioName = `attendance_${data.Student.StudentId}`;

   return (
      <tr style={{ borderBottom: '1px solid black' }}>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>{data.Student.StudentId}</td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>{data.Student.Name}</td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>12:00-1:00</td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>Tutorial</td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>2024-07-28</td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>
            <input
               type="radio"
               name={radioName}
               value="present"
               checked={selectedOption === "present"}
               onChange={handleRadioChange}
            />
         </td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>
            <input
               type="radio"
               name={radioName}
               value="leave"
               checked={
                  selectedOption === "leave" ||
                  leave.some(l => l.StudentId === data.Student.StudentId && l.Date === "2024-07-30" && l.ClassID === 7 && l.Status === "Accepted")
               }
               onChange={handleRadioChange}
            />
         </td>
         <td style={{ textAlign: 'center', padding: '2rem 0' }}>
            <input
               type="radio"
               name={radioName}
               value="absent"
               checked={selectedOption === "absent"}
               onChange={handleRadioChange}
            />
         </td>
      </tr>
   );
}

export default AttendanceSlide;
