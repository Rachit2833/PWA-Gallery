import { useMutation, useQueryClient } from "react-query";
import { addToFav } from "../Sevices/addToFav";
import toast from "react-hot-toast";
import { useHelper } from "../Context/Helper";
import { useNavigate } from "react-router-dom";


export function useAddToFav(){
    const navigate = useNavigate()
    const helper =useHelper()
    const{setSelectImage,setSelectMenu} =helper
    const queryClient =useQueryClient()
    const { mutate: favMutation, isLoading: isAddingToFav } = useMutation({
        mutationFn: async (data) => {
            console.log(data,"this data");
            try {
             if(navigator.onLine){
                   await addToFav(data);
             }else{
                    toast.error("Network Not Available")
             }
            } catch (error) {
                console.error(error);
                // Handle error if needed
                throw error; // Make sure to rethrow the error
            }
        },
     
        onSuccess:async () => {
       
            queryClient.invalidateQueries(["Favourite"]);
            toast.success("Successfully Added To favourites");
            setSelectImage([]);
            setSelectMenu(false);
            navigate("/favourite")
        },
       onError:(error)=>{
        console.error(error);
        toast.error("Something Went Wrong");
        setSelectMenu(false)
       }
    });
   return {favMutation,isAddingToFav}
}