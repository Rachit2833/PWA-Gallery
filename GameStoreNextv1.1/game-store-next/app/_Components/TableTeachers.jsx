'use client';
import React, { useState } from 'react';
import DropMenu from './DropMenu';
import TableRows from './TableRows';
import { uploadCanclledClasses } from '../_Lib/uploadCanclledClasses';

function TableTeachers({ setClass ,checkedClasses, setCheckedClasses,classes, extraClasses, pastClasses, isSubjectSelected, setIsSubjectSelected,  }) {
   const [isMenu, setIsMenu] = useState(false);


   const getCurrentDateFormatted = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   const newClasses = classes.map((item) => {
      
      const date = getCurrentDateFormatted();
      return { ...item, Date: date };
   });
   console.log(classes,newClasses, "hello world");


   const newExtraClasses = extraClasses.map((item) => {
      const date = getCurrentDateFormatted();
      const { id, created_at, Subjects, Teachers, roomNumber, ...filteredItem } = item;
      return { ...filteredItem, Date: date };
   });

   const finalClasses = pastClasses.map((item) => {
      const { id, ...filteredItem } = item;
      return filteredItem;
   });
   function deepEqual(obj1, obj2) {
     
     return obj1?.Date === obj2?.Date && obj1?.Teacher === obj2?.Teacher && obj1?.subject === obj2?.Subjects?.Name &&obj1?.type===obj2?.type &&obj1?.time===obj2?.time
   }
   function deepEqualExtraClasses(obj1,obj2){
      return obj1?.Date === obj2?.Date && obj1?.Teacher === obj2?.Teacher && obj1?.subject === obj2?.subject && obj1?.type === obj2?.type && obj1?.time === obj2?.time
   }

   return (
      <div
         className="one"
         style={{
            borderRadius: '15px',
            boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
            border: '1px solid rgba(132, 139, 200, 0.18)',
            padding: '2rem',
            overflow: 'auto',
            height: '20rem',
         }}
      >
         <div
            style={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}
         >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Upcoming Classes</h2>
            <div style={{ position: 'relative' }}>
               <span
                  style={{ fontSize: '1.8rem' }}
                  onClick={() => {
                     setIsMenu(!isMenu);
                  }}
               >
                  <ion-icon name="ellipsis-vertical-outline"></ion-icon>
               </span>
               {isMenu && (
                  <div
                     style={{
                        position: 'absolute',
                        border: '1px solid rgba(132, 139, 200, 0.18)',
                        boxShadow: '0 2rem 3rem rgba(132, 139, 200, 0.18)',
                        top: '2rem',
                        zIndex: '10',
                        right: '0',
                        padding: '1rem',
                        borderRadius: '15px',
                        backgroundColor: 'white',
                     }}
                  >
                     <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        <DropMenu data="Suspended" icon="exit-outline" />
                        <DropMenu
                           onClick={() => {
                              if (confirm("Sure to continue? Changes can't be made once done")) {
                                 uploadCanclledClasses(checkedClasses);
                                 setIsMenu(false);
                              }
                           }}
                           data="Canceled"x
                           icon="close-sharp"
                        />
                     </ul>
                  </div>
               )}
            </div>
         </div>
         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
               <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Date</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Class</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Subject</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Time</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Type</th>
                  <th style={{ padding: '0.5rem', textAlign: 'center' }}>Select</th>
               </tr>
            </thead>
            <tbody>
               {newClasses.map((item, index) => {
                 const isDuplicate = finalClasses.some((pastItem) => deepEqual(pastItem, item));
                 if (!isDuplicate) {
                   return <TableRows
                  setIsSubjectSelected={setIsSubjectSelected}
                     key={index}
                     item={item}
                     setCheckedClasses={setCheckedClasses}
                     checkedClasses={checkedClasses}
                     setClass={setClass}
                  />
               }
                  return null;
})}
               {newExtraClasses.map((item, index) => {
                  const isDuplicate = finalClasses.some((pastItem) => deepEqualExtraClasses(pastItem, item));
                  if (!isDuplicate) {
                     return (
                        <TableRows
                        setClass={setClass}
                           setIsSubjectSelected={setIsSubjectSelected}
                           key={index}
                           item={item}
                           setCheckedClasses={setCheckedClasses}
                           checkedClasses={checkedClasses}

                        />
                     );
                  }
                  return null;
               })}
            </tbody>
         </table>
      </div>
   );
}

export default TableTeachers;