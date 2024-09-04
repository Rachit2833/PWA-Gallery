import React, { useState } from 'react';

const DropDownInput = () => {
   const [selectedSubject, setSelectedOption] = useState('');

   const handleChange = (event) => {
      setSelectedOption(event.target.value);
   };

   return (
      <div>
         <h1>Select an Option</h1>
         <form>
            <label htmlFor="options">Choose an option:</label>
            <select id="options" value={selectedSubject} onChange={handleChange}>
               <option value="">--Please choose an option--</option>
               <option value="option1">Option 1</option>
               <option value="option2">Option 2</option>
               <option value="option3">Option 3</option>
            </select>
            
         </form>
         {selectedSubject && <p>You selected: {selectedSubject}</p>}
      </div>
   );
};

export default DropDownInput;