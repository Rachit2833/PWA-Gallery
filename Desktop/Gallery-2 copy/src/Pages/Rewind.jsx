import { useQuery } from "react-query"
import RewindCard from "../Rewind/RewindCard"
import { useHelper } from "../Context/Helper";
import AddImg from "../Buttons/MultiOptionButton";
import Loader from "../Loader/Loader";
import NewImageLogo from "../Home/NewImageLogo";

function Rewind() {
    const helper = useHelper()
    const { RewindData, isLoadingMemory } = helper

    return (
        <> 
        {isLoadingMemory ? <Loader /> : 
                
                    RewindData.map((NewData) => (
                        <RewindCard key={NewData.id} Data={NewData} />
                    ))
                
        }
          
            
        </>
    )
}

export default Rewind;
