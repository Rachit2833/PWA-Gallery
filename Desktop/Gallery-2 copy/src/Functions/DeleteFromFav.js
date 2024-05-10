import { QueryClient, useMutation, useQueryClient } from "react-query";
import { DeleteFromFav } from "../Sevices/DeleteFromFav";
import toast from "react-hot-toast";

export function useDeleteFromFav(){ 
    const queryClient =useQueryClient()
    const{mutate:mutateFavDeletion,isLoading:isFavDeleting} =useMutation({
    mutationFn: async (data) => {
      try {
         if(navigator.onLine){
                     await DeleteFromFav(data)
             }else{
                    toast.error("Network Not Available")
             }
       
      } catch (error) {
          console.error(error)
        throw error
      }
    },
    onSuccess:async()=>{
 
        toast.success("Successful")
       queryClient.invalidateQueries(["Favourite"])
    }
    })
    return {mutateFavDeletion,isFavDeleting}
}