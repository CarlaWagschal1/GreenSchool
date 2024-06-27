import PoubelleTri from '../../mocks/img/poubelle-tri.jpg';
import './AnswerWasteComponent.css';

interface wasteProps {
    waste: string;
}

function AnswerWasteComponent(props: wasteProps){


    return (
    <>
        <div className="container-answer-waste">
            <div className="answer-content">
                You have to put your waste in the <a className="answer-bold>" style={{fontWeight: "bold"}}>{props.waste}</a> bin
            </div>
            <div className="answer-img">
                <img src={PoubelleTri} alt="Poubelle de tri"/>
            </div>

        </div>
    </>
    );
}

export default AnswerWasteComponent;

