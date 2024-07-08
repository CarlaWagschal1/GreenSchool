import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import "./HomePageComponent.css";
import {useNavigate} from "react-router-dom";

const HomePageComponent = () => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/login');
    }

    const goToSignInPage = () => {
        navigate('/signin');
    }

    return (
        <main>
            <div className="container-home-page-content">
                <h2 className="green-school-text">GREENSCHOOL</h2>
                <h1 className="green-school-explanation">GreenSchool is a platform that aims to educate children about
                    waste management and recycling. It provides a fun and interactive way to learn about the importance
                    of recycling and how to properly dispose of waste. GreenSchool offers a variety of games and
                    activities that help children understand the impact of waste on the environment and how they can
                    make a difference.</h1>

                <div className="connection-container">
                    <h1 className="join-us-text">Join us and start your journey to a greener future!</h1>
                    <div className="button-container-home">
                        <ButtonAppComponent content="LOGIN" action={goToLoginPage}></ButtonAppComponent>
                        <ButtonAppComponent content="SIGN IN" action={goToSignInPage}></ButtonAppComponent>
                    </div>
                </div>


            </div>
        </main>
    )
}

export default HomePageComponent