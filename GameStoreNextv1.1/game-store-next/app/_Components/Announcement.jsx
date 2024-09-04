import { Suspense, lazy } from "react"

const AnnouncementSlide = lazy(() => import("./AnnouncementSlide")) 
import { getAnnouncements } from "../_Lib/getAnnouncements"


async function Announcement() {
   const acc = await getAnnouncements()

   return (
      
         <div class="updates">
           
               {acc?.map((item, index) => {
                  return <AnnouncementSlide key={index} data={item} />
               })}

           
         </div>

   )
}

export default Announcement
