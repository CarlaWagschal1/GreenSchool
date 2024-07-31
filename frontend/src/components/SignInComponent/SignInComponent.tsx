import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import './SignInComponent.css'


function SignInComponent() {
    const navigate = useNavigate();

    const createAccount = async () => {
        const name = (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value;
        const email = (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value;
        const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
        const confirmPassword = (document.querySelectorAll('input[type="password"]')[1] as HTMLInputElement).value;
        if (password === confirmPassword) {
            console.log("confirm ")

            try {
                const rep = await axios.post('http://localhost:5000/api/signin', {
                    name: name,
                    email: email,
                    password: password
                })
                console.log(rep.data)
                if(rep.data.token){
                    localStorage.setItem('token', rep.data.token);
                    navigate('/educator');
                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            console.log("erreur ")
        }


    }

    const goToHome = () => {
        navigate('/home');
    }

    return (
        <main>
            <div className="signin-container">
                <h1 className="signin-title">SIGN IN</h1>
                <div className="signin-form">
                    <div className="input-container">
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="password" placeholder="Confirm Password" />
                    </div>
                    <ButtonAppComponent content={"Sign In"} action={createAccount} type={"classic"}/>
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={"Home"} action={goToHome} type={"classic"}/>
            </div>
        </main>

    )
}

export default SignInComponent