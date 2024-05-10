import AddButton from "../Buttons/AddButton";
import { useHelper } from "../Context/Helper";
import "./ImageModal.css";

function ImageModal() {
    const helper =useHelper()
    const { fullImg, setFullImg, selectedImage } = helper
    function handleOff() {
        setFullImg(!fullImg);
    }
    return (
        <>
        
        <div className="full-img">
            <button  onClick={handleOff} style={{width:"50px",height:"50px" ,borderRadius:"50%",fontSize:"20px",position:"fixed",top:"20px",right:"20px"}}>X</button>
                <img src={selectedImage} alt="" />
        </div>
        </>
    );
}

export default ImageModal;

