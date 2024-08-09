import Enfant from "../../assets/enfants.png";
import Lesson from "../../assets/livre.png";
import LogOut from "../../assets/logout.png";

import "./EducatorWelcomeComponent.css";
import {useNavigate} from "react-router-dom";

function EducatorWelcomeComponent() {
    const navigate = useNavigate();

    const goToChildrenManager = () => {
        navigate('/children-manager');
    }

    const goToLessonsManager = () => {
        navigate('/lessons-manager');
    }

    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        localStorage.clear();
        navigate('/');
    }


    return (
        <main>
            <div className="educator-welcome-container">
                <h1>Welcome !</h1>
                <div className="container-card">
                    <div className="card" onClick={goToChildrenManager}>
                        <div className="card-img">
                            <img src={Enfant} alt="Enfant" />
                        </div>
                        <div className="card-content">
                            <h2>Children</h2>
                            <p>Manage your children</p>
                        </div>
                    </div>
                    <div className="card" onClick={goToLessonsManager}>
                        <div className="card-img">
                            <img src={Lesson} alt="Leçon" />
                        </div>
                        <div className="card-content">
                            <h2>Lessons</h2>
                            <p>Manage your lessons</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img alt="coming soon" />
                        </div>
                        <div className="card-content">
                            <h2>Coming soon</h2>
                            <p>Manage your coming soon</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logout-educator-container">
                <img src={LogOut} alt={"Log Out"} onClick={logout}/>
            </div>
        </main>
    );
}

export default EducatorWelcomeComponent;