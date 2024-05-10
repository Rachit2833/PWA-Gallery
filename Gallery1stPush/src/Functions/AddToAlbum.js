import { useMutation, useQueryClient } from "react-query";
import { updateData } from "../Sevices/update";
import { useHelper } from "../Context/Helper";
import toast from "react-hot-toast";

export function useAddToAlbum(){
    const helper = useHelper();
    const {rewind,selectImage,albumID,setSelectImage,setRewind,setSelectMenu,}=helper
    const queryClient =useQueryClient()
    const {mutate,isLoading:isAdding} =useMutation({
     mutationFn:async ()=>{
      try
      {
       if(navigator.onLine){
         const newData = [...rewind, ...selectImage];
        await updateData(newData, albumID);
        return newData;
       }else{
        toast.error("Network Not Available")
       }
      }
    catch(error) 
      {
       console.error("Mutation error:", error);
       throw error; // Rethrow the error to be caught by the onError or handled by React Query
      }
   
     },
    onSuccess:async (newData) => {
    
    toast.success('Addition Successful');
    console.log("Successfully done");
    setSelectImage([]);
    setRewind(newData);
    setSelectMenu(false);
    queryClient.invalidateQueries(["RewindData"]);
  },
})
return {mutate ,isAdding}
}