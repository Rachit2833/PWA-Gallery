import { useNavigate } from "react-router-dom"
import { useHelper } from "../Context/Helper"
import "./MultiOptionButton.css"

function MultiOptionButton({ threeOption, handle1, handle2, handle3,handle4 }) {
    const navigate= useNavigate()
    const helper = useHelper()
    const { handleDelete, setButtonClick, mutate, rewind, selectImage, albumID, isInAlbum, isInPrivate, setIsInPrivate } = helper
  
    return (
     <div className="multibutton">
            <div class="paste-button">
                <button class="button-Multi">Add/Delete &nbsp; ▼</button>
                <div class="dropdown-content">
                {handle1 ? <a id="top" href="#" onClick={ handle1}>ADD</a> : null}
                {handle2 ? <a id="middle" href="#" onClick={handle2}>Delete</a>:null}
                {handle4 ? <a id="bottom" href="#" onClick={handle4}>Share</a>: null}
                {handle3 ? <a id="bottom" href="#" onClick={handle3}>Add To Favourite</a>: null}
                </div>
            </div>
     </div>


    )
}

export default MultiOptionButton
