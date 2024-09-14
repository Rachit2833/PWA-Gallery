import { useMutation, useQuery, useQueryClient } from "react-query";
import AddButton from "../Buttons/AddButton"
import Card from "../Home/Card";
import Modal from "../Modals/Modal";
import ImageModal from "../Modals/ImageModal";
import { useHelper } from "../Context/Helper";

import Loader from "../Loader/Loader";
import MultiOptionButton from "../Buttons/MultiOptionButton";
import Button from "../Button/Button";
import { deleteCard } from "../Sevices/deleteCard";
import toast from "react-hot-toast";
import { addToFav } from "../Sevices/addToFav";
import { usePrivate } from "../Functions/AddToPrivate";
import { useDelete } from "../Functions/DeleteAlbum";
import { useAddToAlbum } from "../Functions/AddToAlbum";
import { useNavigate } from "react-router-dom";
import { useHomeDelete } from "../Functions/DeletefromHome";
import { useDeleteFromFav } from "../Functions/DeleteFromFav";
import { useAddToFav } from "../Functions/AddToFav";
import { useEffect } from "react";
import { useAddPost } from "../Functions/AddPost";
import ClipboardImagePaste from "../Home/ClipboardImagePaste";
import Share from "./Share";

const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHlxeGt0Z3ZpbWd6bWxoZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3ODYxMjYsImV4cCI6MjAyMDM2MjEyNn0.kzgiwwCbJj2Jx9xyoRoTr8mIcGUBRrFu_WFbzZf5AKA"
const Table = "Images"
const supabaseUrl = 'https://hwhyqxktgvimgzmlhecg.supabase.co';
const url = `${supabaseUrl}/rest/v1/${Table}?apikey=${Key}`;
function Home() {
    const helper =useHelper()
    const queryClient =useQueryClient()
    const navigate =useNavigate()
 
    const {mutatePrivate,isSettingPrivate} =usePrivate()
    const { mutate, isAdding } = useAddToAlbum()
    const { DeleteMutate, isDeleting } =useHomeDelete()
    const {favMutation,isAddingToFav} =useAddToFav()  
    const { handleNewImage,modal, fullImg, selectMenu, Card: CardData, isLoading, handleSelectMenu, selectImage,  FavouriteData,  isPrivateAuthenicated, rewind, albumID,  isFromAlbum }=helper
  

    

  

    function handleDeleteFromHome (){
     if(selectMenu && selectImage.length!==0){
         selectImage.map((data) => {
          DeleteMutate(data)
         })
     }else{
        toast.error("No Images Selected")
     }
    }
    function handleAddToFav() {
      toast.success("Hello"); 
      console.log(FavouriteData);
       selectImage.map((data)=>{
        var parsedData=JSON.parse(data)
           favMutation(parsedData)
       })
        
    }

    function handleAdd() {
        mutate([...rewind, ...selectImage], albumID);
        console.log("Successfully added");
        navigate("/album")


    }
    function addPrivate() {
        selectImage.map((data) => {
            mutatePrivate(data)
            DeleteMutate(data)
        })
    }

    return (
        <>
           
            {isLoading || isDeleting || isAddingToFav ? (
           
                    <Loader />
    
            ) : fullImg ? (
                <ImageModal />
            ) : modal ? (
                <Modal />
            ) : null}

            {CardData.map((data) => (
                <Card key={data.id} data={data} />
            ))}
            
            <Share />
            <ClipboardImagePaste />
                    


            <div  className="button-Add">
         
                    <Button handleFunction={handleSelectMenu} />

                {isFromAlbum ? <MultiOptionButton handle1={handleAdd} handle2={null} handle3={null} /> : isPrivateAuthenicated ? <MultiOptionButton handle1={addPrivate} handle2={null} handle3={null} /> : <MultiOptionButton handle1={handleNewImage} handle2={handleDeleteFromHome} handle3={handleAddToFav} />}
            </div>
            


            
        </>
    )
}

export default Home




    
   
    // < MultiOptionButton handle1 = { handleAdd } handle2 = { null} handle3 = { null} />