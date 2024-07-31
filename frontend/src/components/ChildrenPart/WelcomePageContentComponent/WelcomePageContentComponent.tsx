import GameScrollComponent from "../GameScrollComponent/GameScrollComponent.tsx";
import {Game} from "../../../interfaces/GameInterface.tsx";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./WelcomePageContentComponent.css";
import WasteGameIMG from "../../../mocks/img/waste-game-img.png";
import { useNavigate } from 'react-router-dom';
import LogOutIMG from "../../../assets/logout.png";
import ChildrenLogoutComponent from "../../Children/ChildrenLogoutComponent/ChildrenLogoutComponent";


const gamesList: Game[] = [
    { name: "Drag and drop", img: WasteGameIMG, url: '/game1'},
    { name: "Raining Waste", img: WasteGameIMG, url: '/game2' },
    { name: "Game 3", img: WasteGameIMG, url: '/game3' },
    // Add other games as necessary
];


export default function WelcomePageContentComponent() {
    const navigate = useNavigate();

    const navigateToScanPage = () => {
        navigate('/scan');
    }

    const handleHideLogOutPopup = (cancel: boolean) => {
        if(cancel){
            hideLogOutPopup();
        }

    }

    const showLogOutPopup = () => {
        const logoutPopup = document.querySelector('.logout-popup') as HTMLDivElement;
        logoutPopup.style.display = "block";
    }

    const hideLogOutPopup = () => {
        const logoutPopup = document.querySelector('.logout-popup') as HTMLDivElement;
        logoutPopup.style.display = "none";
    }

    return(
        <main>
            <div className="container-home-page-content">
                <h2 className="welcome-text">WELCOME TO GREENSCHOOL !</h2>
                <div className="button-container">
                    <ButtonAppComponent content={"CLASS YOUR WASTE"} action={navigateToScanPage} type={"classic"}></ButtonAppComponent>
                </div>
                <div className="game-scroll">
                    <GameScrollComponent gamesList={gamesList}></GameScrollComponent>
                </div>
            </div>
            <div className="logout-button">
                <img src={LogOutIMG} alt={"Log Out"} onClick={showLogOutPopup}/>
            </div>
            <div className="logout-popup">
                <div className="logout-popup-content">
                    <div className="logout-popup-component">
                        <ChildrenLogoutComponent cancelLogout={handleHideLogOutPopup}></ChildrenLogoutComponent>
                    </div>
                </div>
            </div>
        </main>
    )
}