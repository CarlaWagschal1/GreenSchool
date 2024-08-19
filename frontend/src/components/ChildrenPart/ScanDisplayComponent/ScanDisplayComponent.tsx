import Webcam from "react-webcam";
import {useCallback, useEffect, useRef, useState} from "react";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./ScanDisplayComponent.css";

function ScanDisplayComponent () {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        navigate('/welcome');
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
                            <ButtonAppComponent content={t('take-picture')} action={capture} type={"classic"}></ButtonAppComponent>
                        </div>
                    </div>
                )}

                <div className="btn-retake">
                    <ButtonAppComponent content={t('back')} action={navigateToHomePage} type={"classic"}></ButtonAppComponent>
                </div>

            </div>
        </main>
    );
}

export default ScanDisplayComponent;