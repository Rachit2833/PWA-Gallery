import { useMutation, useQueryClient } from "react-query";
import { deleteFromPrivate } from "../Sevices/deleteFromPrivate";
import toast from "react-hot-toast";
import { useHelper } from "../Context/Helper";

export function useDeletePrivate(){
    const helper =useHelper()
    const{setSelectMenu} =helper
    const queryClient= useQueryClient()
    const {mutate:deletePrivateMutate,isLoading:isPrivateDeleting}=useMutation({
        mutationFn:async (data)=>{
          try {
            if(navigator.onLine){
                 await deleteFromPrivate(data)
             }else{
                    toast.error("Network Not Available")
             }
             
          } catch (error) {
            throw error
          }
        },
        onSuccess:async()=>{
            queryClient.invalidateQueries(["PrivateData"])
            toast.success("removed form private")
            setSelectMenu(false)
        },
        onError:(error)=>{
            console.error(error);
        }
    })
    return {deletePrivateMutate,isPrivateDeleting }
}