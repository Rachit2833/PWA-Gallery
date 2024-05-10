import React from 'react';
import './PostModal.css';
import { useForm } from 'react-hook-form';
import { useAddPost } from '../Functions/AddPost';
import Loader from '../Loader/Loader';
import { useHelper } from '../Context/Helper';
import { uploadFile } from '../Sevices/addToBucket';

function PostModal({children,picture}) {
    const { postMutate, isPostLoading } = useAddPost()
    const {register,handleSubmit} =useForm()

   
    function onSubmit(data){
            console.log(data);
        const randomId = Math.floor(Math.random() * 256000);

        console.log(picture)
        uploadFile(picture,randomId)


        const imageData = {
            id: randomId,
            created_at: new Date().toISOString(),
            Location: data.Location,
            Date: "2025-01-20",
            Description: data.Description,
            Image: `https://hwhyqxktgvimgzmlhecg.supabase.co/storage/v1/object/public/images/${randomId}.png`,
        };

       postMutate(imageData)
        
    }
    function onError(err){
        console.error(err);
    }
    return (
        <> 
        {isPostLoading?<Loader />:null}
            <div id="profileModal">
                 <div className="img">
                    {children}
                 </div>
                <form onSubmit={handleSubmit(onSubmit,onError)}>
                    <div className="modal-content">

                        <input type="text" placeholder="Location" {...register("Location")}/>
                        <input type="text" placeholder="Description"{...register("Description")} />
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PostModal;



