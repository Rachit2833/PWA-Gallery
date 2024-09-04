import { getClassesInd } from "../_Lib/getClassesInd";

async function ClassSide({item,index}) {
   // const classes = await getClassesInd()
   return (
      <>
                  <div style={{ padding: "0.5rem", marginTop: "1rem", border: "1px solid rgba(132, 139, 200, 0.18)" }} >
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ color: item.type === "Lecture" ? "royalblue" : item.type === "Tutorial" ? "#FFF455" : coolBrightColors[(index + 2) % 25] }}>{item.type}</h2>
                        <span style={{ fontSize: "1rem" }}>{item.time}</span>
                     </div>
                     <div style={{ margin: "1rem 0", padding: "0 0.5rem " }}>
                        <h3>{item.subject}</h3>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                           <h3 style={{ margin: "1rem 0" }}><b>Room No:</b>{item.roomNumber}</h3>
                           <h3 style={{ margin: "1rem 0" }}>CSE_2</h3>
                        </div>
                     </div>
                  </div>
      </>
   )
}

export default ClassSide
