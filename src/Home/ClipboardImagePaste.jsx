import React, { useEffect, useState, useRef } from 'react';
import { addCard } from '../Sevices/addCard';
import { uploadFileFromDocuments } from '../Sevices/addToBucket';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

function ClipboardImagePaste() {
   const [images, setImages] = useState([]); // Array to store multiple images
   const [categoryText, setCategoryText] = useState('');
   const [headingText, setHeadingText] = useState('');
   const headingRef = useRef(null);
   const categoryRef = useRef(null);
   const [imageFiles, setImageFiles] = useState([]);
   const queryClient = useQueryClient();

   const getCurrentMonthYear = () => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('en-US', options).format(date);
   };

   const getDefaultTagline = () => {
      return "The Beautiful World";
   };

   const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items;
      const newImages = [];

      for (const item of items) {
         if (item.type.startsWith('image/')) {
            const blob = item.getAsFile();
            const imageUrl = URL.createObjectURL(blob);
            newImages.push({ imageUrl, imageFile: blob, isAdded: false }); // Add 'isAdded' flag for each image
            console.log('Pasted image URL:', imageUrl);
         }
      }

      if (newImages.length > 0) {
         setImages((prevImages) => [...prevImages, ...newImages]); // Add new images to the array
         setImageFiles((prevFiles) => [...prevFiles, ...newImages.map(img => img.imageFile)]); // Add new files to array
      }

      setTimeout(() => {
         if (headingRef.current) {
            headingRef.current.focus();
         }
      }, 0);
   };

   useEffect(() => {
      document.addEventListener('paste', handlePaste);
      return () => {
         document.removeEventListener('paste', handlePaste);
      };
   }, []);

   useEffect(() => {
      if (images.length > 0) {
         if (!headingText) {
            setHeadingText(getCurrentMonthYear());
         }
         if (!categoryText) {
            setCategoryText(getDefaultTagline());
         }
      }
   }, [images, headingText, categoryText]);

   const handleCategoryChange = (e) => {
      setCategoryText(e.target.innerText);
   };

   const handleHeadingChange = (e) => {
      setHeadingText(e.target.innerText);
   };

   const handleAddCard = async (image, index) => {
      if (image.imageFile && headingText && categoryText) {
         try {
            const uploadResult = await uploadFileFromDocuments(image.imageFile);
            console.log('Upload result:', uploadResult);

            if (uploadResult.success) {
               const cardData = {
                  Image: `https://hwhyqxktgvimgzmlhecg.supabase.co/storage/v1/object/public/images/${image.imageFile.name}`,
                  Description: headingText,
                  Location: categoryText
               };
               await addCard(cardData);
               console.log('Card added successfully');

               // Update the image to mark it as added
               const updatedImages = [...images];
               updatedImages[index].isAdded = true;
               setImages(updatedImages);

               // Show success toast
               toast.success('Card added successfully');
               queryClient.invalidateQueries("Card")
            } else {
               console.error('Upload failed:', uploadResult.error);
               toast.error('Failed');
            }
         } catch (error) {
            console.error('Error during upload or adding card:', error);
         }
      } else {
         console.log("Please ensure all fields are filled.");
      }
   };

   return (
      <>
         

         { images.map((img, index) => {
            if(img.isAdded===true){
              return null
            }
            return <div key={index} className="card" style={{ position: 'relative' }}>
               {!img.isAdded && ( // Show checkmark only if not added
                  <h1
                     style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        zIndex: 4,
                        cursor: 'pointer',
                        color: "black"
                     }}
                     onClick={() => handleAddCard(img, index)} // Pass image and index to handleAddCard
                  >
                     <ion-icon name="checkmark-circle"></ion-icon>
                  </h1>
               )}
               <div className="card-image">
                  <img src={img.imageUrl} alt="" />
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
         })}
         <div className='' style={{ gridColumn: " span 4", margin: " 1rem 1rem 1rem 1rem", textAlign: "center" }}>
            <h1>Paste Image from Clipboard</h1>
            <p>Press `Cmd+V` to paste images from your clipboard.</p>
         </div>
      </>
   );
}

export default ClipboardImagePaste;