import { useMutation, useQueryClient } from "react-query";
import { useHelper } from "../Context/Helper";
import { updateData } from "../Sevices/update";
import toast from "react-hot-toast";

export function useDelete(){
    const queryClient =useQueryClient()
    const helper =useHelper()
    const {rewind,selectImage,setSelectMenu,setRewind,setSelectImage,albumID} =helper
      const { mutate: deleteMutation, isLoading: isDeleting} = useMutation({
    mutationFn: async (data) => {
      try {
            if(navigator.onLine){
                const newData = rewind.filter(item => !selectImage.includes(item));
          await updateData(newData, albumID);
          return newData;
             }else{
                    toast.error("Network Not Available")
             }
  
         

      } catch (error) {
        console.error("Mutation error:", error);
        throw error; // Rethrow the error to be caught by the onError or handled by React Query
      }
    },
    onSuccess: async (newData) => {
 
        toast.success('Deletion Successful');
    

      console.log("Successfully done");
      setSelectImage([]);
      setRewind(newData);
      setSelectMenu(false);
      queryClient.invalidateQueries(["RewindData"]);
    },
  });
  return{deleteMutation,isDeleting}
}