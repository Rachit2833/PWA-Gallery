import "@/app/_Styles/Modal.css";

function FormInput({ placeholder, type, value, setState,name }) {
   return (
      <input
         onChange={(e) => {
            setState(e.target.value);
         }}
         value={value || ""}
         placeholder={placeholder}
         type={type}
         name={name}
         className="input"
      />
   );
}

export default FormInput;