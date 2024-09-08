import { useNavigate } from "react-router-dom"
import "./RewindCard.css"
import { useHelper } from "../Context/Helper"
import toast from "react-hot-toast"
function RewindCard({Data}) {
    const helper =useHelper()
    const { setAlbumID, setRewind, rewind, setSelectImage, setSelectMenu, isInAlbum, setIsInAlbum }= helper
    const navigate = useNavigate()
     function handleClick(data){
        setIsInAlbum(true)
        setAlbumID(data.id)
        setRewind(data.Image)
         setSelectImage([])
         setSelectMenu(false)
        navigate("/album")
         if (data.Image.length === 0) {
             toast.error("No Images here")
         }
        
    }
    
    return (
        <div className="container-rewind" onClick={()=>handleClick(Data)}>
            <div className="palette-rewind">
                <div id="color1" className="color-rewind">
                    <img src="/pexels-photo-1659438.jpeg" alt="" />
                </div>
                <div id="color2" className="color-rewind">
                    <img src="/images.jpeg" alt="" />
                </div>
                <div id="color3" className="color-rewind">
                    <img src="/depositphotos_664395810-stock-photo-watching-sunrise-window-vehicle-light.jpg" alt="" />
                </div>
                <div id="color4" className="color-rewind">
                    <img src="/image.jpeg" alt="" />
                </div>
                
            </div>
            <div id="footer">
                <div id="bookmarks">
                   
                    <span>{Data.Name}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </div>
        </div>
    )
}

export default RewindCard
