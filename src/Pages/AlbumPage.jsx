import { useNavigate } from "react-router-dom";
import { useHelper } from "../Context/Helper";
import { useEffect } from "react";
import Card from "../Home/Card";
import ImageModal from "../Modals/ImageModal";
import Loader from "../Loader/Loader";
import MultiOptionButton from "../Buttons/MultiOptionButton";
import SelectButton from "../Buttons/SelectButton";
import NewImageLogo from "../Home/NewImageLogo";
import { useDelete } from "../Functions/DeleteAlbum";
import { useAddToAlbum } from "../Functions/AddToAlbum";
import Button from "../Button/Button";
import { useQueryClient } from "react-query";

function AlbumPage() {
    const queryClient =useQueryClient()
    const { deleteMutation, isDeleting: isDeletingAlbum } = useDelete()
    const { isAdding } =useAddToAlbum()
     const navigate = useNavigate();
    const helper = useHelper();
    const { albumID, RewindData,selectImage, fullImg,  rewind, isDeleting,setIsInAlbum, setSelectMenu,  setIsPrivateAuthenicated, setIsFromAlbum ,selectMenu,handleSelectMenu } = helper;

    function handleDelete() {

        console.log("This is delete");
        if (selectImage.length !== 0) {
            if (selectImage.every(item => rewind.includes(item))) {
                console.log("All items found in rewind");
                deleteMutation(rewind.filter(item => !selectImage.includes(item)), albumID);
            }

            setSelectMenu(!selectMenu);
            queryClient.invalidateQueries(["RewindData"]);
        } else {
            toast.error('No Images Selected');
        }
    }


    useEffect(() => {
        setIsInAlbum(true)
        setIsFromAlbum(true)
        setIsPrivateAuthenicated(false)
        setSelectMenu(false)
        if (albumID === null) {
            navigate("/rewind");
        }
    }, [albumID, navigate]);

    const album = RewindData.find((newData) => newData.id === albumID);

    return (
        <>
            {isAdding || isDeleting ? (
                <Loader />
            ) : !rewind || rewind.length === 0 ? (
                <div className="centerImage">
                    <NewImageLogo />
                </div>
            ) : (
               null
            )}
            {fullImg ? <ImageModal /> : null}

            {album &&
                album.Image.map((jsonData) => {
                    const currentData = JSON.parse(jsonData);
                    return <Card key={currentData.id} data={currentData} />;
                })}
            <div className="NewImageLogo">
                {!rewind || rewind.length !== 0 ? <NewImageLogo /> : null} 
            </div>
            <MultiOptionButton threeOption={false} handle1={null} handle2={handleDelete} handle3={null} />
            <div className="multibutton">
                <Button handleFunction={handleSelectMenu} />

            </div>
        </>
    );
}

export default AlbumPage;


