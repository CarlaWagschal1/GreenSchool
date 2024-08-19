import PoubelleTri from '../../../mocks/img/poubelle-tri.jpg';
import './AnswerWasteComponent.css';
import { useTranslation} from "react-i18next";

interface wasteProps {
    waste: string;
}

function AnswerWasteComponent(props: wasteProps){
    const { t } = useTranslation();

    return (
    <main>
        <div className="container-answer-waste">
            <div className="answer-content">
                {t('scan-waste-answer-content')} <a className="answer-bold>" style={{fontWeight: "bold"}}>{props.waste}</a> {t('bin')}
            </div>
            <div className="answer-img">
                <img src={PoubelleTri} alt="Poubelle de tri"/>
            </div>

        </div>
    </main>
    );
}

export default AnswerWasteComponent;

