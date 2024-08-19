import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AnswerWasteComponent from "../../components/ChildrenPart/AnswerWasteComponent/AnswerWasteComponent";
import {useLocation} from "react-router-dom";


function AnswerPage() {
    const location = useLocation();
    //const {state} = location.state;
    const waste = location.state.waste;
    console.log(location.state.waste);
    console.log(waste);


    return (
        <>
            <HeaderComponent></HeaderComponent>
            <AnswerWasteComponent waste={waste}></AnswerWasteComponent>

        </>
    );
}

export default AnswerPage;