'use client'
import { useAppContext } from "../_Lib/AppProvider";

function NotificationPanel({children }) {
   const { alertPanel, setAlertPanel } = useAppContext();
   return (
      <div  className={`right notification-panel ${alertPanel ? "active" : ""}`}>
         <div  className="announcements rfcv">
            <div className="updates" style={{ padding: "1rem",height:"40rem" }}>
              {children}
            </div>
         </div>
      </div>
   );
}

export default NotificationPanel;