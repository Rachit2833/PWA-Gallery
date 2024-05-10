import { useHelper } from "../Context/Helper"
import "./Memories.css"
function Memories() {
    const helper =useHelper()
    const { moreMemories, setMoreMemories, isInFav, setIsInFav }= helper
    return (
        <button class="button-Memories" onClick={()=>{
            setMoreMemories(true)
        console.log("HERE WE GO")}}>
            <span class="button-content">More Memories</span>
        </button>
    )
}

export default Memories
