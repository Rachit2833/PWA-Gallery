
import { useQuery } from "react-query"
import "./image.css"
import { useHelper } from "../Context/Helper";
import CheckBox from "./CheckBox";
import { useEffect, useState } from "react";

const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHlxeGt0Z3ZpbWd6bWxoZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3ODYxMjYsImV4cCI6MjAyMDM2MjEyNn0.kzgiwwCbJj2Jx9xyoRoTr8mIcGUBRrFu_WFbzZf5AKA"
const Table = "Images"
const supabaseUrl = 'https://hwhyqxktgvimgzmlhecg.supabase.co';
const url = `${supabaseUrl}/rest/v1/${Table}?apikey=${Key}`;



function Card({ data }) {

    const helper = useHelper(false);
    const {selectMenu,rewind,isInAlbum, privateData,setSelectedImage,setFullImg} = helper;

    const handleImage = (data) => {
        console.log("got clicked", data);
        setSelectedImage(data.Image);
        setFullImg(true);
    };

    // Parse the rewind array
    const rewindArray = rewind?.map(item => JSON.parse(item));
 

    // Check if the current data is present in both Card and rewind arrays
    const isCommonCardInAlbum = rewindArray?.some(item => item.id === data.id);
    
    // Set the className based on whether it's a common card or not


    return (
        <>
            <div className={`card`}>
                <div style={{minHeight:"150px" }} className="card-image" onClick={() => { handleImage(data) }}>
                    <img  src={data.Image} alt="" />
                </div>
                 <div style={{overflowY :"auto" , maxHeight:"100px"}} className="lower">
                    <div className="category"> {data.Location} </div>
                    <div  className="heading"> {data.Description} 
                    </div>
                    <div className="author"> By <span style={{ textAlign: "left" }} className="name">Abi</span> 4 days ago</div>
                    {selectMenu && !isCommonCardInAlbum && !isInAlbum || selectMenu && isInAlbum ? <CheckBox Data={data} /> : null}
                 </div>
               
            </div>
        </>
    );
}

export default Card;