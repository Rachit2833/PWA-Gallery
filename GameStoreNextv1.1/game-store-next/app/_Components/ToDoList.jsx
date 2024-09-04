function ToDoList() {
   return (
      <div className="one" style={{ borderRadius: "15px ", boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)", border: "1px solid  rgba(132, 139, 200, 0.18) ", padding: "2rem", backgroundColor: "#9CDBA6", height:"20rem" }} >
         <div class="todo-container">
            <h1>To-Do List</h1>
            <div class="input-container">
               <input type="text" placeholder="Add a new task..." />
               <button>Add</button>
            </div>
            <ul class="todo-list">
               <li class="todo-item">
                  <span>Sample Task 1</span>
                  <button class="delete-btn">Delete</button>
               </li>
               <li class="todo-item">
                  <span>Sample Task 2</span>
                  <button class="delete-btn">Delete</button>
               </li>
               <li class="todo-item">
                  <span>Sample Task 3</span>
                  <button class="delete-btn">Delete</button>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default ToDoList
