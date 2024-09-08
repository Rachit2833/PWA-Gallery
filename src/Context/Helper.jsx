// Necessary Imports

import { createContext, useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addToPrivate } from "../Sevices/addPrivate";
import { getPrivateData } from "../Sevices/PrivateData";


//Supabase Data
const Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aHlxeGt0Z3ZpbWd6bWxoZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3ODYxMjYsImV4cCI6MjAyMDM2MjEyNn0.kzgiwwCbJj2Jx9xyoRoTr8mIcGUBRrFu_WFbzZf5AKA";
const Table = "Rewinds";
const Table2 = "Images";
const Table3 ="Favourites"
const supabaseUrl = 'https://hwhyqxktgvimgzmlhecg.supabase.co';
const url = `${supabaseUrl}/rest/v1/${Table2}?apikey=${Key}`;
const url2 = `${supabaseUrl}/rest/v1/${Table}?apikey=${Key}`;
const url3 = `${supabaseUrl}/rest/v1/${Table3}?apikey=${Key}`;

const Helper = createContext();

//Main Function
function HelperContext({ children }) {

  //State Management
  const [modal, setModal] = useState(false);
  const [fullImg, setFullImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [albumID, setAlbumID] = useState(null);
  const [selectImage, setSelectImage] = useState([]);
  const [selectMenu, setSelectMenu] = useState(false);
  const [rewind, setRewind] = useState(null);
  const [isInAlbum, setIsInAlbum] = useState(false);
  const [isInPrivate, setIsInPrivate] = useState(false);
  const [moreMemories, setMoreMemories] = useState(false);
  const [isPrivateAuthenicated, setIsPrivateAuthenicated] = useState(false);
  const [isFromAlbum, setIsFromAlbum] = useState(false);


  //Data fetching using REACT Query
  const queryClient = useQueryClient();

  // Card Data Of Home Page
  const { data: Card = [], isLoading, } = useQuery({
    queryFn: async () => {
      return fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("From the Network", data);

          return data;
        });
    },
    queryKey: ["Card"]
  });


  //Rewind Data Of Rewind Page
  const { data: RewindData = [], isLoading: isLoadingMemory } = useQuery({
    queryFn: async () => {
      return fetch(url2)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          return data;
        });
    },
    queryKey: ["RewindData"],
  });
  

  const { data: FavouriteData = [], isLoading:isFavLoading } = useQuery({
    queryFn: async () => {
      return fetch(url3)
        .then(res => res.json())
        .then(data => {
          console.log("From the Network fav", data);

          return data;
        });
    },
    queryKey: ["Favourite"]
  });


  const { data: privateData = [], isLoading:isLoadingPrivate } = useQuery({
    queryFn: getPrivateData,
    queryKey: ["PrivateData"],
  });



  function handleSelectMenu() {
    console.log("gtc");
    setSelectImage([])
    setSelectMenu(!selectMenu);
  }
  

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
function handleNewImage(){
setModal(!modal)
}
  return (
    <Helper.Provider value={{ handleNewImage,modal,setFullImg, setModal, fullImg, setSelectedImage, selectedImage, albumID, setAlbumID, RewindData,  selectImage, selectMenu, setSelectMenu, setRewind, handleSelectMenu,  isLoadingMemory,  setSelectImage, rewind,  Card, isInAlbum, setIsInAlbum,  isLoading, setMoreMemories, moreMemories, isPrivateAuthenicated, setIsPrivateAuthenicated, FavouriteData, isFavLoading, isInPrivate, setIsInPrivate,   isFromAlbum, setIsFromAlbum, privateData, isLoadingPrivate ,dataURItoBlob}}>
      {children}
    </Helper.Provider>
  );
}



function useHelper() {
  const helper = useContext(Helper);
  return helper;
}

export { useHelper, HelperContext };
