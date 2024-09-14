import React, { useEffect, useRef, useState } from 'react';
import { openDB } from 'idb';

const Share = () => {
   const [imageDataURLs, setImageDataURLs] = useState([]);
   const [categoryText, setCategoryText] = useState('');
   const [headingText, setHeadingText] = useState('');
   const headingRef = useRef(null);
   const categoryRef = useRef(null);

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

                       <h1
                          style={{
                             position: 'absolute',
                             top: '-10px',
                             right: '-10px',
                             zIndex: 4,
                             cursor: 'pointer',
                             color: "black"
                          }}
                       >
                          <ion-icon name="checkmark-circle"></ion-icon>
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
