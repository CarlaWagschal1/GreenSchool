import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";

import './LoginComponent.css'


function LoginComponent(){
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    }

    return (
        <main>
            <div className="login-container">
                <h1 className="login-title">LOGIN</h1>
                <div className="login-form">
                    <div className="input-container">
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                    </div>
                    <ButtonAppComponent content={"Login"} />
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={"Home"} action={goToHome}/>
            </div>
        </main>
    )
}

export default LoginComponent