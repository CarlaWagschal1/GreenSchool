import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import './LoginComponent.css'
import {useEffect} from "react";


function LoginComponent(){
    const navigate = useNavigate();

    const login = async () => {
        const email = (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value;
        const password = (document.querySelectorAll('input[type="password"]')[0] as HTMLInputElement).value;

        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const data = {
                email: email,
                password: password
            }

            const rep = await axios.post('http://localhost:5000/api/login', data, { headers: headers });

            if(rep.data.token){
                console.log(rep.data.token)
                localStorage.setItem('token', rep.data.token);
                navigate('/educator');
            }
        }
        catch (error) {
            console.log(error)
        }


    }

    const goToHome = () => {
        navigate('/home');
    }

    const handleEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            login();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEvent);

        return () => {
            document.removeEventListener('keydown', handleEvent);
        }
    });

    return (
        <main>
            <div className="login-container">
                <h1 className="login-title">LOGIN</h1>
                <div className="login-form">
                    <div className="input-container">
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                    </div>
                    <ButtonAppComponent content={"Login"} action={login} type={"classic"}/>
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={"Home"} action={goToHome} type={"classic"}/>
            </div>
        </main>
    )
}

export default LoginComponent