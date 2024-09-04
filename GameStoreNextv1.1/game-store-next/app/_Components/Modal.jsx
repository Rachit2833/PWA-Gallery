"use client"

function Modal({ type,currentDate, isactiveModal , setIsActiveModal,children }) {
   
   return (
      <div class="modal">
         <div class="modal-content" style={{
            borderRadius: "25px", boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
            border: "1px solid  rgba(132, 139, 200, 0.18) ",
}}>
            <span onClick={()=>{
               setIsActiveModal(false)
            }} class="close">&times;</span>
            <h1 style={{margin:"1rem"}}>Schedule A {type}</h1>
            {children}
         </div> 
      </div>
   )
}

export default Modal
