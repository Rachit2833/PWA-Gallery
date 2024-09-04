import { createUser } from "../_Lib/createUser";


function AnnouncementSlide({data}) {
  
   return (
      <div class="message">
         <b>{data.Topic}</b> <p>{data.Details}</p>
         <p class="text-muted">{data.created_at}</p>
      </div>
   )
}

export default AnnouncementSlide
