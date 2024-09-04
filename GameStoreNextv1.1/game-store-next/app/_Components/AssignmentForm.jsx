'use client'
import { useState } from "react";
import { addAssignment } from "../_Lib/actions";
import { toast } from 'react-hot-toast';
import FormInput from "./FormInput";

function formatDate(date) {
   const d = new Date(date);
   const month = (d.getMonth() + 1).toString().padStart(2, '0');
   const day = d.getDate().toString().padStart(2, '0');
   const year = d.getFullYear();

   return `${year}-${month}-${day}`;
}

function AssignmentForm({ setIsActiveModal, currentDate }) {
   const [selectedSubject, setSelectedSubject] = useState('');
   const [topic, setTopic] = useState('');
   const [assignmentNumber, setAssignmentNumber] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [details, setDetails] = useState('');
   const [file, setFile] = useState(null);
   const [loading, setLoading] = useState(false);
   const assignedDate = formatDate(currentDate);

   const handleChangeSubject = (event) => {
      setSelectedSubject(event.target.value);
   };

   const handleFileChange = (event) => {
      setFile(event.target.files[0]);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.target);

      try {
         await addAssignment(formData);
         toast.success("Assignment uploaded successfully!");
         setIsActiveModal(false);
      } catch (error) {
         toast.error("Failed to upload assignment.");
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
            <FormInput name="Topic" type="text" placeholder="Topic" value={topic} setState={setTopic} required />
            <FormInput name="AssignmentNumber" type="number" placeholder="Assignment Number" value={assignmentNumber} setState={setAssignmentNumber} required />
            <FormInput name="DueDate" type="date" value={dueDate} setState={setDueDate} required />
         </div>
         <div style={{ margin: "1rem 0" }}>
            <label htmlFor="details">Details</label>
            <textarea
               rows={6}
               name="details"
               id="details"
               placeholder="Enter additional details"
               value={details}
               onChange={(e) => setDetails(e.target.value)}
               style={{ width: "100%", padding: "0.5rem", border: "1px solid rgba(132, 139, 200, 0.18)", borderRadius: "5px" }}
            />
         </div>
         <div style={{ height: "3rem" }} className={`container-btn-file ${file ? "has-file" : ""}`}>
            Upload File
            <input
               className="file btn"
               name="AssignmentFile"
               type="file"
               onChange={handleFileChange}
               required
            />
         </div>

         <div style={{ position: "absolute", right: "6.75rem", paddingBottom: "2rem" }}>
            <button type="submit"  style={{ border: "1px solid black" }} className="cancel btn" disabled={loading}>
               {loading ? 'Uploading...' : 'Add Assignment'}
            </button>
         </div>
      </form>
   );
}

export default AssignmentForm;