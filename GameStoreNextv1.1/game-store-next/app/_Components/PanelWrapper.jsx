import { Suspense } from "react";
import NotificationPanel from "./NotificationPanel";
import Notify from "./Notify";
import Loading from "../loading";

async function PanelWrapper() {
   return (

 
            <NotificationPanel >
                 <Suspense fallback={<Loading />}>
            <Notify />
                 </Suspense>
            </NotificationPanel>
      
      
   )
}

export default PanelWrapper
