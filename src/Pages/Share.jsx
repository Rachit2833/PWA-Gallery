import React, { useEffect, useRef, useState } from 'react';
import { openDB } from 'idb';
import { uploadFileFromDocuments } from '../Sevices/addToBucket';
import { addCard } from '../Sevices/addCard';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

const Share = () => {
   const [imageDataURLs, setImageDataURLs] = useState([]);
   const [categoryText, setCategoryText] = useState('');
   const [headingText, setHeadingText] = useState('');
   const headingRef = useRef(null);
   const categoryRef = useRef(null);
   const queryClient = useQueryClient()

   
   function base64ToBlob(base64, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(base64.split(',')[1]); // Split out the Base64 header and decode the base64
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         const slice = byteCharacters.slice(offset, offset + sliceSize);
         const byteNumbers = new Array(slice.length);
         for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
         }
         const byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
   }

   const handleAddCard = async (imageDataUrl, id) => {
      try {
         let date = new Date();
         let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date
               .getHours()
               .toString()
               .padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date
                  .getSeconds()
                  .toString()
                  .padStart(2, "0")}`;
         let uniqueFilename = `${formattedDate}-${id}`;

         // Convert the base64 dataUrl to a Blob
         const blob = base64ToBlob(imageDataUrl, 'image/png'); // Assuming the image is PNG
         const file = new File([blob], `${uniqueFilename}.png`, { type: 'image/png' });

         const uploadResult = await uploadFileFromDocuments(file, uniqueFilename);
         console.log('Upload result:', uploadResult);

         if (uploadResult.success) {
            const cardData = {
               Image: `https://hwhyqxktgvimgzmlhecg.supabase.co/storage/v1/object/public/images/${uniqueFilename}`,
               Description: headingText||"njb",
               Location: categoryText||"klnk"
            };
            await addCard(cardData);
            console.log('Card added successfully');

            toast.success('Card added successfully');
            queryClient.invalidateQueries("Card");
         } else {
            console.error('Upload failed:', uploadResult.error);
            toast.error('Failed to upload image');
         }
      } catch (error) {
         console.error('Error during upload or adding card:', error);
         toast.error('Error adding card');
      }
   };
   // Function to remove the image from IndexedDB
   const removeImageFromIDB = async (id) => {
      try {
         const db = await openDB('share-store', 1);
         const tx = db.transaction('shared-images', 'readwrite');
         await tx.store.delete(id); // Delete the image with the specified id
         await tx.done;
         console.log(`Image with id ${id} removed from IndexedDB`);
      } catch (error) {
         console.error('Failed to remove image from IndexedDB:', error);
      }
   };
   async function handleAdd(id, image) {
      try {
         await handleAddCard(image, id);

         // If card is added successfully, remove it from IndexedDB
         await removeImageFromIDB(id);

         // After removing from IndexedDB, update the state to remove the image from the UI
         setImageDataURLs((prevImages) => prevImages.filter((img) => img.id !== id));

         toast.success('Image uploaded and removed from IndexedDB');
      } catch (error) {
         console.error('Error adding card or removing from IDB:', error);
         toast.error('Failed to remove image from IndexedDB');
      }
   }

   const handleCategoryChange = (e) => {
      setCategoryText(e.target.innerText);
   };

   const handleHeadingChange = (e) => {
      setHeadingText(e.target.innerText);
   };
   // Initialize IndexedDB
   const initDB = async () => {
      const db = await openDB('share-store', 1, {
         upgrade(db) {
            if (!db.objectStoreNames.contains('shared-images')) {
               db.createObjectStore('shared-images', { keyPath: 'id', autoIncrement: true });
            }
         },
      });
      return db;
   };
   // Retrieve all stored images from IndexedDB
   const getStoredImages = async () => {
      const db = await initDB();
      const tx = db.transaction('shared-images', 'readonly');
      const storedImages = await tx.store.getAll();
      return storedImages.map((item) => item); // Extract Base64 image data
   };

   // Load stored images into the state
   const loadStoredImages = async () => {
      const storedImages = await getStoredImages();
      console.log(storedImages);
      setImageDataURLs(storedImages);
   };

   // Load images on component mount
   useEffect(() => {
      loadStoredImages();
   }, []);

   return (
      <>
         {imageDataURLs.length > 0 ? (
            imageDataURLs.map((data, index) => {
              return(
                 <div key={index} className="card" style={{ position: 'relative' }}>

                    <h1 onClick={() => handleAdd(data.id, data.dataUrl)}
                          style={{
                             position: 'absolute',
                             top: '-10px',
                             right: '-10px',
                             zIndex: 4,
                             cursor: 'pointer',
                             color: "black"
                          }}
                       >
                          <ion-icon  name="checkmark-circle"></ion-icon>
                       </h1>
                    <div className="card-image">
                       <img src={data.dataUrl} alt="" />
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: '100px' }} className="lower">
                       <div
                          ref={categoryRef}
                          className="category"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={handleCategoryChange}
                          style={{ outline: 'none' }}
                       >
                          {categoryText || 'Enter category here'}
                       </div>
                       <div
                          ref={headingRef}
                          className="heading"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={handleHeadingChange}
                          style={{ outline: 'none' }}
                       >
                          {headingText || 'Enter heading here'}
                       </div>
                       <div className="author">
                          By <span style={{ textAlign: 'left' }} className="name">Abi</span> 4 days ago
                       </div>
                    </div>
                 </div>
            )})
         ) : (
            null
         )}
      </>
   );
};

export default Share;
