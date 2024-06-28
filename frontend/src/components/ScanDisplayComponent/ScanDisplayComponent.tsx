import Webcam from "react-webcam";
import {useCallback, useEffect, useRef, useState} from "react";
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


    const findWaste = () => {
        // TODO: API CALL
        navigate('/answer', {state: {waste: "plastic"}})

    }

    useEffect(() => {
        if (imgSrc) {
            findWaste();
        }
    }, [findWaste, imgSrc]);

    return (
        <main>
            <div className="webcam-container">
                {imgSrc ? (
                    <div className="img-preview">
                        <img src={imgSrc} alt="Captured"/>
                    </div>
                ) : (
                    <div className="web-camera">
                        <Webcam ref={webcamRef} mirrored={true} screenshotFormat="image/jpeg"/>

                        <div className="btn-capture">
                            <ButtonAppComponent content={"TAKE A PICTURE"} action={capture}></ButtonAppComponent>
                        </div>
                    </div>
                )}

                <div className="btn-retake">
                    <ButtonAppComponent content={"Home"} action={navigateToHomePage}></ButtonAppComponent>
                </div>

            </div>
        </main>
    );
}

export default ScanDisplayComponent;