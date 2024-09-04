import "@/app/_Styles/notification.css"
import Link from "next/link"
function Notification({item}) {
   return (
      <div class="notification_card">
         <div class="notification_img material-icons-sharp" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            computer
         </div>
         <div class="notification_textBox">
            <div class="notification_textContent">
               <Link href={item.Url}> <p class="notification_h1">{item.Subject}</p></Link>
            </div>
            <p class="notification_p">{item.Topic}</p>
            <p class="notification_p">Due: {item.dueDate}</p>
         </div>
         
      </div>
   )
}

export default Notification
