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
import { useEffect, useState } from "react";
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
    const [canShareFiles, setCanShareFiles] = useState(false);

    // Function to check if the browser can share files
    function canBrowserShareFiles() {
        if (!navigator.share || !navigator.canShare) {
            return false;
        }

        // Create test data to check if the browser supports sharing files
        const testFile = new File(["foo"], "foo.txt", { type: "text/plain" });
        const data = { files: [testFile] };

        return navigator.canShare(data);
    }

    useEffect(() => {
        // Check if the browser supports file sharing and update the state
        if (canBrowserShareFiles()) {
            setCanShareFiles(true);
        }
    }, []);

    

  

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
      console.log(FavouriteData);
       selectImage.map((data)=>{
        var parsedData=JSON.parse(data)
           favMutation(parsedData)
       })
        
    }
    async function handleShare() {
        try {
            if (selectImage.length === 0) {
                toast.error("No images selected for sharing");
                return;
            }

            const filePromises = selectImage.map(async (imageData) => {
                  const imageLink= JSON.parse(imageData).Image
                if (!imageLink) {
                    throw new Error("Image URL is missing or invalid");
                }

                // Fetch the image from the URL
                const response = await fetch(imageLink);

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.statusText}`);
                }

                // Convert the response to a blob
                const blob = await response.blob();

                // Extract file name and type from the URL (if available)
                const fileName = imageLink.split("/").pop() || "shared-image.png";
                const fileType = blob.type || "image/png";

                // Create a File object with the correct blob, name, and type
                const file = new File([blob], fileName, { type: fileType });

                return file;
            });

            // Wait for all file promises to resolve
            const filesToShare = await Promise.all(filePromises);

            // Use navigator.share to share the files
            await navigator.share({
                title: "Shared Images",
                files: filesToShare,
            });

            console.log("The file was successfully shared");
        } catch (err) {
            console.error(`The file could not be shared: ${err}`);
            toast.error(`Failed to share: ${err.message}`);
        }
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
                    


            <div   className="button-Add">
         
                    <Button handleFunction={handleSelectMenu} />

                {isFromAlbum ? <MultiOptionButton handle1={handleAdd} handle2={null} handle3={null}  /> : isPrivateAuthenicated ? <MultiOptionButton handle1={addPrivate} handle2={null} handle3={null} /> : <MultiOptionButton handle1={handleNewImage} handle2={handleDeleteFromHome} handle3={handleAddToFav} handle4={handleShare} />}
            </div>
            


            
        </>
    )
}

export default Home




    
   
    // < MultiOptionButton handle1 = { handleAdd } handle2 = { null} handle3 = { null} />