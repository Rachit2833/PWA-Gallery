import { useEffect } from "react";
import { useHelper } from "../Context/Helper";
import { useNavigate } from "react-router-dom";
import Card from "../Home/Card";
import { useMutation, useQuery } from "react-query";
import Loader from "../Loader/Loader";
import { getPrivateData } from "../Sevices/PrivateData";
import MultiOptionButton from "../Buttons/MultiOptionButton";
import NewImageLogo from "../Home/NewImageLogo";
import { addToPrivate } from "../Sevices/addPrivate";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { deleteCard } from "../Sevices/deleteCard";
import { useDeletePrivate } from "../Functions/deletePrivate";

function Privatepage() {
    const navigate = useNavigate();
    const helper = useHelper();
    const {deletePrivateMutate,isPrivateDeleting} =useDeletePrivate()
    const { isPrivateAuthenicated, handleSelectMenu, Card: CardData, isInAlbum, selectImage, setSelectImage, setIsInAlbum, privateData, isLoadingPrivate:isLoading} = helper;
  function deleteFromPrivate(){
      selectImage.map((data)=>{
               deletePrivateMutate(data)
      })
  }
   


    useEffect(() => {
        setIsInAlbum(false)
        if (!isPrivateAuthenicated) {
            navigate("/private", { replace: true });
        }
    }, [isPrivateAuthenicated, navigate]);

    console.log(CardData);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                privateData.map((data) => <Card data={data} key={data.id} />)
            )}
            {privateData.length !== 0 ? (
                <div className="NewImageLogo">
                    <NewImageLogo />
                </div>
            ) : (
                <div className="centerImage">
                    <NewImageLogo />
                </div>
            )}
            <div className="multibutton">
                <Button handleFunction={handleSelectMenu} />

            </div>
            <MultiOptionButton handle1={ null} handle2={deleteFromPrivate} handle3={null}/>

        </>
    );
}

export default Privatepage;
