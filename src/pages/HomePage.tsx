import HeaderComponent from "../components/HeaderComponent/HeaderComponent.tsx";
import HomePageContentComponent from "../components/HomePageContentComponent/HomePageContentComponent.tsx";
import './HomePage.css';

export default function HomePage() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <HomePageContentComponent></HomePageContentComponent>
        </>
    )
}
