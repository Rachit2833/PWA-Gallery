import { useHelper } from "../Context/Helper";
import "./CheckBox.css";

function CheckBox({Data}) {
    const helper = useHelper()
    
    const {  rewind,selectImage,setSelectImage } =helper


    function handleCheckBoxSelect(data, e) {
        console.log(e.target.checked);
        var toggle = e.target.checked;
        console.log(data, typeof data);
        console.log(rewind, typeof rewind);
        var newData = JSON.stringify(data);
        // Check if data is already an object
        if (toggle) {
            setSelectImage([...selectImage, newData]);
            console.log("THIS IS THE VALUE OF SELECTED IMAGES +1", selectImage, typeof selectImage);
        } else {
            setSelectImage(selectImage.filter(item => item !== newData));
        }
    }
    return (
        <label className="checkbox-btn">
            <label for="checkbox"></label>
            <input id="checkbox" type="checkbox" onChange={(e)=>{

                handleCheckBoxSelect(Data,e)
               
            }}></input>
                <span className="checkmark"></span>
        </label>
    );
}

export default CheckBox;

