import { useMutation, useQueryClient } from "react-query"
import { addToPrivate } from "../Sevices/addPrivate"
import toast from "react-hot-toast"

export  function usePrivate(){
    const queryClient =useQueryClient()
    const { mutate: mutatePrivate, isLoading: isSettingPrivate } = useMutation({
    mutationFn: async (data) => {
      try {
         if(navigator.onLine){
                     await addToPrivate(data)
             }else{
                    toast.error("Network Not Available")
             }
     
      } catch (error) {
        console.error(error)
      }
    },
    onSuccess: async() => {
  
      queryClient.invalidateQueries(["PrivateData"])
      toast.success("Set Private")
    }

  })
  return {mutatePrivate ,isSettingPrivate}
}