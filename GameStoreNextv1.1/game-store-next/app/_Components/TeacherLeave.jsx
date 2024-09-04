
function TeacherLeave({data}) {
   return (

       
         <div class="teacher">
         <div className="profile-photo" style={{ position: "relative" }}>
            <img style={{ objectFit: "cover" }} src="/www.jpeg" alt="" />
         </div>
            <div class="info">
               <h3>{data?.Teachers?.Name}</h3>
            <small class="text-muted">{data?.Duration}</small>
            </div>
         </div>

   )
}

export default TeacherLeave
