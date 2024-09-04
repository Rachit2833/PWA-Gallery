import { getExtraEvent } from "../_Lib/getExtraEvents";
function isDateInRange(date, startDate, endDate) {
   const targetDate = formatDate(date);
   const start = formatDate(startDate);
   const end = formatDate(endDate);
   return targetDate >= start && targetDate <= end;
}
function formatDate(date) {
   const d = new Date(date);
   const month = (d.getMonth() + 1).toString().padStart(2, '0');
   const day = d.getDate().toString().padStart(2, '0');
   const year = d.getFullYear();

   return `${year}-${month}-${day}`;
}
async function EventSide({item,index}) {
   // const events = await getExtraEvent()
   return (
      <>
         
                     <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                           <h2 style={{ color: `${coolBrightColors[(index + 3) % 25] || "royalBlue"} `, borderRadius: "50%" }}>{item.Event}</h2>
                           <span style={{ fontSize: "1rem" }}>{item.Time}</span>
                        </div>
                        <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                           <p>{item.Description}</p>
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber ? item.roomNumber : "Seminar Hall"}</h3>
                              <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                           </div>
                        </div>
                     </div>
               </>
   )
}

export default EventSide
