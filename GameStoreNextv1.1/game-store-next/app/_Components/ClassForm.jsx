'use client'
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { addClass } from "../_Lib/actions";
import FormInput from "./FormInput";

function formatDate(date) {
   const d = new Date(date);
   const month = (d.getMonth() + 1).toString().padStart(2, '0');
   const day = d.getDate().toString().padStart(2, '0');
   const year = d.getFullYear();
   return `${year}-${month}-${day}`;
}

function ClassForm({ setIsActiveModal, currentDate }) {
   const [selectedDate, setSelectedDate] = useState(formatDate(currentDate));
   const [selectedSubject, setSelectedSubject] = useState('');
   const [selectedType, setSelectedType] = useState('');
   const [fromTime, setFromTime] = useState('');
   const [toTime, setToTime] = useState('');
   const [roomNumber, setRoomNumber] = useState('');
   const [loading, setLoading] = useState(false);

   const handleChangeSubject = (event) => {
      setSelectedSubject(event.target.value);
   };


   const handleChangeType = (event) => {
      setSelectedType(event.target.value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.target);

      try {
         await addClass(formData);
         toast.success("Class scheduled successfully!");
         setIsActiveModal(false);
      } catch (error) {
         toast.error("Failed to schedule class.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit} style={{ margin: "2rem 1rem" }}>
         <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0" }}>
            <select name="subject" id="options" value={selectedSubject} onChange={handleChangeSubject} required>
               <option value="">Subjects</option>
               <option value="Data Structures and Algorithm">Data Structures and Algorithm</option>
               <option value="Mathematical Engineering">Mathematical Engineering</option>
               <option value="Computer Architecture">Computer Architecture</option>
            </select>
            <FormInput name="Date" type="date" value={selectedDate} setState={setSelectedDate} required />
            <select name="type" id="options" value={selectedType} onChange={handleChangeType} required>
               <option value="">Type</option>
               <option value="Lecture">Lecture</option>
               <option value="Tutorial">Tutorial</option>
               <option value="Lab">Lab</option>
            </select>
            <FormInput name="roomNumber" type="text" placeholder="Room Number" value={roomNumber} setState={setRoomNumber} required />
         </div>

         <h2 style={{ margin: "1rem 0 0 0" }}>Select Time</h2>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0" }}>
            <FormInput name="FromTime" type="time" value={fromTime} setState={setFromTime} required />
            <FormInput name="ToTime" type="time" value={toTime} setState={setToTime} required />
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0" }}>
            <FormInput name="Teacher" type="text" value="12" />
            <FormInput name="Class" type="text" value="CSE_2" />
         </div>
         <div style={{ position: "absolute", right: "6.75rem" }}>
            <button type="submit" className="cancel btn" disabled={loading}>
               {loading ? 'Scheduling...' : 'Schedule Class'}
            </button>
         </div>
      </form>
   );
}

export default ClassForm;