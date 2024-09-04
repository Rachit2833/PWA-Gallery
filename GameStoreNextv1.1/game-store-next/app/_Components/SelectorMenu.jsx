import React, { useState } from 'react';

function SelectorMenu({ index, onSubmit }) {
   const [selectedStatus, setSelectedStatus] = useState('');

   const handleStatusChange = (status) => {
      setSelectedStatus(status);
   };

   const handleSubmit = () => {
      onSubmit(index, selectedStatus);
   };

   return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
         <select
            onChange={(e) => handleStatusChange(e.target.value)}
            value={selectedStatus}
            style={{ marginRight: '1rem' }}
         >
            <option value="">Select Status</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
            <option value="suspended">Suspended</option>
         </select>
         <button
            onClick={handleSubmit}
            style={{
               backgroundColor: 'blue',
               color: 'white',
               padding: '0.5rem 1rem',
               borderRadius: '5px'
            }}
         >
            Submit
         </button>
      </div>
   );
}

export default SelectorMenu;