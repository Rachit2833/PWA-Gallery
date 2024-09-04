'use client'
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { addEvent } from "../_Lib/actions";
import FormInput from "./FormInput";

function EventForm({ fromDate, setFromDate, toDate, setToDate, setIsActiveModal }) {
   const [eventName, setEventName] = useState('');
   const [eventType, setEventType] = useState('');
   const [fromTime, setFromTime] = useState('');
   const [toTime, setToTime] = useState('');
   const [loading, setLoading] = useState(false);

   function handleChangeType(event) {
      setEventType(event.target.value);
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.target);

      try {
         await addEvent(formData);
         toast.success("Event scheduled successfully!");
         setIsActiveModal(false);
         setFromDate(null);
         setToDate(null);
      } catch (error) {
         toast.error("Failed to schedule event.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit} style={{ margin: "2rem 1rem" }}>
         <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", margin: "1rem 0" }}>
            <FormInput name="Event" type="text" placeholder="Event" value={eventName} setState={setEventName} />
            <select name="Type" id="options" value={eventType} onChange={handleChangeType}>
               <option value="">Event Type</option>
               <option value="Fullday">Fullday</option>
               <option value="Halfday">Halfday</option>
               <option value="Partial-Fullday">Partial-Fullday</option>
            </select>
            <FormInput name="Head" type="text" placeholder="Event Title" value={eventName} setState={setEventName} />
         </div>

         <textarea name="Description" style={{ borderRadius: "15px", padding: "1rem" }} placeholder="Event Description" rows={4} cols={62}></textarea>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 0.1fr 1fr", gap: "1rem", margin: "1rem 0", textAlign: "center" }}>
            <FormInput name="StartDate" type="date" setState={setFromDate} value={fromDate} />
            <p style={{ margin: "auto 0" }}><b>To</b></p>
            <FormInput name="EndDate" type="date" setState={setToDate} value={toDate} />
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 0.1fr 1fr", gap: "1rem", margin: "1rem 0", textAlign: "center" }}>
            <FormInput name="FromTime" type="time" value={fromTime} setState={setFromTime} />
            <p></p>
            <FormInput name="ToTime" type="time" value={toTime} setState={setToTime} />
         </div>
         <div style={{ position: "absolute", right: "6.75rem" }}>
            <button type="submit" className="cancel btn" disabled={loading}>
               {loading ? 'Scheduling...' : 'Schedule Event'}
            </button>
         </div>
      </form>
   );
}

export default EventForm;