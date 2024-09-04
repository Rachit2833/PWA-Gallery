
function formatDate(date) {
   const d = new Date(date);
   const month = (d.getMonth() + 1).toString().padStart(2, '0');
   const day = d.getDate().toString().padStart(2, '0');
   const year = d.getFullYear();

   return `${year}-${month}-${day}`;
}
async function ExtraClassSide({item,coolBrightColors,index}) {
   // const extraClasses= await getExtraClasses()
   return (
      <>
        <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                           <h2 style={{ color: item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : coolBrightColors[(index + 2) % 25] }}>{item.type}</h2>
                           <span style={{ fontSize: "1rem" }}>{item.time}</span>
                        </div>
                        <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                           <h3>{item.subject} (Data Structures And Algorithm)</h3>
                           <div style={{ display: "flex", justifyContent: "space-between" }}>
                              <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber}</h3>
                              <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                           </div>
                        </div>
                     </div>
      </>
   )
}

export default ExtraClassSide
