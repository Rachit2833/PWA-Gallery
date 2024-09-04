function DropMenu({data ,onClick,icon}) {
   return (
   
        
            <h2 onClick={onClick} style={{ display: "flex", alignItems: "center", padding: "0.5rem", borderBottom: "2px solid rgba(132, 139, 200, 0.18)", fontSize: "1.2rem", width: "15rem", marginTop: "1rem" }}>
               <ion-icon name={icon} style={{ fontSize: "1.6rem", marginRight: "0.5rem" }}></ion-icon>
               {data}
            </h2>

   )
}

export default DropMenu
