import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.tsx";
import WelcomePageContentComponent from "../../components/WelcomePageContentComponent/WelcomePageContentComponent.tsx";
import './WelcomePage.css';

export default function WelcomePage() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <WelcomePageContentComponent></WelcomePageContentComponent>
        </>
    )
}
