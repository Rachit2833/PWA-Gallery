import { useMutation, useQueryClient } from "react-query";
import { addCard } from "../Sevices/addCard";
import toast from "react-hot-toast";

export function useAddPost(){
    const queryClient =useQueryClient()
    const {mutate:postMutate,isLoading:isPostLoading} =useMutation({
     
         mutationFn:(data)=>{
          try {
              addCard(data)
          } catch (error) {
              throw error
          }
        }
       ,
        onSuccess:()=>{
            toast.success("Post Added")
            queryClient.invalidateQueries(["Card"])
        },
        onError:()=>{
            toast.error("Some Error Occurred")
        }
    })
    return {postMutate,isPostLoading}
}