import Button from "../Button/Button";
import Memories from "../Buttons/Memories";
import MultiOptionButton from "../Buttons/MultiOptionButton";
import { useHelper } from "../Context/Helper";
import { useDeleteFromFav } from "../Functions/DeleteFromFav";
import Card from "../Home/Card";

import "./Favourite.css"
import { useQuery } from "react-query";
const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHlxeGt0Z3ZpbWd6bWxoZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3ODYxMjYsImV4cCI6MjAyMDM2MjEyNn0.kzgiwwCbJj2Jx9xyoRoTr8mIcGUBRrFu_WFbzZf5AKA";
const Table3 = "Favourites"
const supabaseUrl = 'https://hwhyqxktgvimgzmlhecg.supabase.co';
const url3 = `${supabaseUrl}/rest/v1/${Table3}?apikey=${Key}`;
function FavouriteLayout() {
     const helper =useHelper()

    const { moreMemories, FavouriteData, isFavLoading: isLoading, selectImage, handleSelectMenu } = helper
    const { mutateFavDeletion, isFavDeleting } = useDeleteFromFav()
    function handleDeleteFromFav() {
            selectImage.map((data)=>{
                 mutateFavDeletion(data)
            })
    }
    return (
        <>
            {!moreMemories ? <> <h1 className="heading-fav">Favourite Memories</h1>

                <div className="card-container-fav">
                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[0]?.Image})`, "--angle": "-5deg", "--x": "5%", "--y": "15%", "--caption": `${FavouriteData[0]?.Location}`, }}></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[1]?.Image})`, "--angle": "-1deg", "--x": "-10%", "--y": "-20%", "--caption": `${FavouriteData[1]?.Location}`, }}></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[2]?.Image})`, "--angle": "-4deg", "--x": "-20%", "--y": "5%", "--caption": `${FavouriteData[2]?.Location}`, }} ></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[3]?.Image})`, "--angle": "7deg", "--x": "10%", "--y": "-7%", "--caption": `${FavouriteData[3]?.Location}`, }}></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[4]?.Image})`, "--angle": "7deg", "--x": "30%", "--y": "-20%", "--caption": `${FavouriteData[4]?.Location}`, }}></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[5]?.Image})`, "--angle": "10deg", "--x": "-40%", "--y": "-20%", "--caption": `${FavouriteData[5]?.Location}`, }} ></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[6]?.Image})`, "--angle": "10deg", "--x": "-45%", "--y": "20%", "--caption": `${FavouriteData[6]?.Location}`, }} ></div>

                    <div className="cardFav" style={{ "--image": `url(${FavouriteData[7]?.Image})`, "--angle": "14deg", "--x": "45%", "--y": "20%", "--caption": `${FavouriteData[7]?.Location}`, }} ></div>
                    <Memories />
                </div></> : 
                FavouriteData.map((data) => <Card data={data} key={data.id} />)
                }

            <div className="multibutton">
                <Button handleFunction={handleSelectMenu} />

            </div>
            <MultiOptionButton handle1={null} handle2={handleDeleteFromFav} handle3={null}/>
        </>
    );
}

export default FavouriteLayout;
