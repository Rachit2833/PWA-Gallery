import { useHelper } from "../Context/Helper"
import "./SelectButton.css"
function SelectButton() {
    const helper =useHelper()
    const { handleSelectMenu }=helper
    return (
        <button class="button-Select" onClick={handleSelectMenu}>
         🔖
        </button> 
    )
}

export default SelectButton
