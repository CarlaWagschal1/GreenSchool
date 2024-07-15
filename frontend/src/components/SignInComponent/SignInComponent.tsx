import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import './SignInComponent.css'


function SignInComponent() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    }

    return (
        <main>
            <div className="signin-container">
                <h1 className="signin-title">SIGN IN</h1>
                <div className="signin-form">
                    <div className="input-container">
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                    <ButtonAppComponent content={"Sign In"} />
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={"Home"} action={goToHome}/>
            </div>
        </main>

    )
}

export default SignInComponent