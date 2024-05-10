import { useForm } from "react-hook-form"
import "./Form.css"
import toast from "react-hot-toast";
import { useHelper } from "../Context/Helper";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Password() {
    const navigate =useNavigate()
    const helper =useHelper()
    const { isPrivateAuthenicated, setIsPrivateAuthenicated, isInPrivate, setIsInPrivate,setIsInAlbum }=helper
  
    const pass="1234"
    const {handleSubmit,register}=useForm()
    function onSubmit(data){
     console.log(data);
     var input = data.First_Number+data.Second_Number+data.Third_Number+data.Fourth_Number
        console.log(pass)
        if(input===pass){
            toast.success("Welcome")
            setIsInPrivate(true)
            setIsPrivateAuthenicated(true)
            navigate('/vault')
        }
        else{
            toast.error("wrong Password")
        }
    }
    function OnError(err){
    toast.error("Some Error Occured")
    }
    return (
        <div className="centerImage-private">
            <div class="container-private">
                <h4>Enter Password</h4>
                <form action="#" onSubmit={handleSubmit(onSubmit,OnError)} >
                    <div class="input-field-private">
                        <input type="number-private" maxLength={1}{...register("First_Number",{required:"This Field is Required"})} />
                        <input type="number-private" maxLength={1}{...register("Second_Number",{required:"This Field is Required"})} />
                        <input type="number-private" maxLength={1}{...register("Third_Number",{required:"This Field is Required"})} />
                        <input type="number-private" maxLength={1}{...register("Fourth_Number",{required:"This Field is Required"})} />
                    </div>
                    <button  type="submit">Verify Password</button>
         
                </form>
            </div>
       </div>
    )
}

export default Password
