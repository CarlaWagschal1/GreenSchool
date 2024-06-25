import Webcam from "react-webcam";
import {useCallback, useRef, useState} from "react";
import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";

import "./ScanDisplayComponent.css";

function ScanDisplayComponent () {
    const navigate = useNavigate();

    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const capture = useCallback(() => {
        console.log(webcamRef.current)
        if(!webcamRef.current) return;
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc])
    const navigateToHomePage = () => {
        setImgSrc(null);
        navigate('/');
    }

    return (
        <div className="webcam-container">
            {imgSrc ? (
                <div className="answerWaste"> You can throw your waste in the bin "...." </div>
            ) : (
                <div className="web-camera">
                    <Webcam ref={webcamRef} mirrored={true} screenshotFormat="image/jpeg" />

                    <div className="btn-capture">
                        <ButtonAppComponent content={"TAKE A PICTURE"} action={capture}></ButtonAppComponent>
                    </div>
                </div>
            )}

            <div className="btn-retake">
                <ButtonAppComponent content={"Home"} action={navigateToHomePage}></ButtonAppComponent>
            </div>

        </div>
    );
}

export default ScanDisplayComponent;