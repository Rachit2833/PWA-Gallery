import { useHelper } from "../Context/Helper"
import "./Add.css"
function AddButton() {
    const helper =useHelper()
    const { handleNewImage,}=helper
    return (
        <button className="button" onClick={handleNewImage}>
            <svg className="svgIcon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
            </svg>
        </button>
    )
}


export default AddButton
