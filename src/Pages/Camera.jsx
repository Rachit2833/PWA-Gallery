import React, { useState, useEffect, useRef } from 'react';
import { addCard } from '../Sevices/addCard';
import { uploadFile } from '../Sevices/addToBucket';
import ImageModal from '../Modals/ImageModal';
import Modal from '../Modals/Modal';
import PostModal from '../Modals/PostModal';
import { useHelper } from '../Context/Helper';
var picture
function Camera() {
    const helper =useHelper()
    const { dataURItoBlob } = helper
    const [videoSrc, setVideoSrc] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();
    
    const [facingMode, setFacingMode] = useState('environment'); // Default to back camera


    async function handleCameraOpen() {
        setIsModal(false)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
            setVideoSrc(stream);
            setOpenCamera(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            // Handle error as needed
        }
    }

    

    function handleCameraClose() {
        setIsModal(false)
        setIsClicked(false)
        if (videoSrc) {
            videoSrc.getTracks().forEach(function (track) {
                track.stop();
            });
            setVideoSrc(null);
            setOpenCamera(false);
            // Clear the canvas
            const canvas = canvasRef?.current;
            const context = canvas?.getContext('2d');
            context?.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    function handleSelect(){
        setIsModal(true)
    }

    function handleSwitchCamera() {
        setFacingMode((prevFacingMode) => (prevFacingMode === 'environment' ? 'user' : 'environment'));
        handleCameraClose(); // Close current camera
        handleCameraOpen();  // Open camera with new facingMode
    }

    function handleClick() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setIsClicked(true)
        setOpenCamera(false);
        if (openCamera) {
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            function drawFrame() {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(drawFrame);
            }

            drawFrame();
          

           picture = dataURItoBlob(canvas.toDataURL("image/png"));
          


        }
    }

    useEffect(() => {
        if (videoSrc && videoRef.current) {
            videoRef.current.srcObject = videoSrc;
        }

        return () => {
            handleCameraClose();
        };
    }, [videoSrc]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (openCamera) {
                event.returnValue = true;
                return 'Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [openCamera]);

    return (
        <>

            <div style={{ width: '70%', height: '90%', position: 'fixed', padding: '20px', backgroundColor: "#FAF9F6" }}>
                {openCamera ? (
                    <video ref={videoRef} autoPlay style={{ width: '100%', height: '90%', position: "relative", zIndex: 2, top: "20px" }} />
                ) : null}
               
                {openCamera && <button style={{ position: 'fixed', right: '75%', top: "80%", zIndex: 3 }} onClick={handleClick}>📷</button>}
                {isModal ? <div className="head" style={{ zIndex: "10" }}>
                    <PostModal picture={picture} children={<canvas ref={canvasRef} style={{ border: "1px solid blue", height: "100%", width: "100%" }} />} />


                </div> : <canvas ref={canvasRef} className='canvas' style={{ width: "80%", height: "80%", position: "absolute", zIndex: 1, left: "100px", top: "20px" }} />}
            </div>
            <button onClick={openCamera || isClicked ? handleCameraClose : handleCameraOpen} style={{ position: 'fixed', right: '40%', top: "80%", zIndex: 3 }}>
                {openCamera || isClicked ? "Close Camera" : "Open Camera"}
            </button>
            {openCamera && (
                <button onClick={handleSwitchCamera} style={{ position: 'fixed', right: '10%', top: "80%", zIndex: 3 }}>
                    Switch Camera
                </button>
            )}
            {isClicked ? <button onClick={handleSelect} style={{ position: 'fixed', right: '10%', top: "80%", zIndex: 3 }}>
                Select
            </button>: null}
        </>
    );
}

export default Camera;
