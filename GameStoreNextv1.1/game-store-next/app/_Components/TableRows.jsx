"use client"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

function TableRows({ item, setCheckedClasses, setIsSubjectSelected,setClass }) {
   const searchParams = useSearchParams();
   const router = useRouter();
   const pathname = usePathname();

   const handleCheckboxChange = (event) => {
      const { checked } = event.target;
      const filteredItem = {
         Date: item.Date,
         Teacher: item.Teacher,
         Class: item.Class,
         subject: item.subject,
         time: item.time,
         type: item.type,
      };

      if (checked) {
         setCheckedClasses((prevCheckedClasses) => [...prevCheckedClasses, filteredItem]);
      } else {
         setCheckedClasses((prevCheckedClasses) =>
            prevCheckedClasses.filter(
               (checkedItem) =>
                  checkedItem.Date !== filteredItem.Date ||
                  checkedItem.Teacher !== filteredItem.Teacher ||
                  checkedItem.Class !== filteredItem.Class ||
                  checkedItem.subject !== filteredItem.subject ||
                  checkedItem.time !== filteredItem.time ||
                  checkedItem.type !== filteredItem.type
            )
         );
      }
   };

   const handleRowClick = () => {
       setClass(item)
       const params = new URLSearchParams(searchParams.toString());

      // Set the `subject` and `type` parameters
      if (item?.Subjects) {
         params.set("subject", item?.Subjects?.Name);
         params.set("type", item.type || 'defaultType');  // Ensure type is defined
      } else {
         params.set("subject", item.subject);
         params.set("type", item.type || 'defaultType');  // Ensure type is defined
      }
      router.replace(`${pathname}?${params.toString()}`);
      setIsSubjectSelected(true);
   };

   return (
      <tr  style={{ borderBottom: '1px solid black' }}>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{item.Date}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{item.Class || item.Subjects?.Class}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{item.Subjects?.Name || item.subject}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>{item.time}</td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div style={{
               backgroundColor: item.type === 'Tutorial' ? '#36BA98' : item.type === 'Lecture' ? 'royalBlue' : item.type === 'Lab' ? '#604CC3' : '#03AED2',
               color: 'white',
               padding: '0.5rem 1rem',
               borderRadius: '25px',
            }}>{item.type}</div>
         </td>
         <td style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <input type="checkbox" onChange={handleCheckboxChange} />
         </td>
         <td >
            <button className='btn' onClick={handleRowClick}>Enter</button>
         </td>
      </tr>
            
   );
}

export default TableRows;