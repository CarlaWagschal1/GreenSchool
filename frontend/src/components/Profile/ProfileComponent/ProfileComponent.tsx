import {useEffect, useState} from "react";

import './ProfileComponent.css';
import {useNavigate} from "react-router-dom";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import Close from "../../../assets/close.png";

function ProfileComponent() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const response = await fetch('http://localhost:5000/api/educator', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setName(data.name);
            setEmail(data.email);
        }
    }

    useEffect(() => {
        fetchProfile();
    });

    const goToWelcome = () => {
        navigate("/educator");
    }

    const closePopup = () => {
        const popups = document.querySelectorAll('.popup-profile') as NodeListOf<HTMLDivElement>;
        popups.forEach(popup => {
            popup.style.display = 'none';
        });
    }

    const displaySuccessPopup = () => {
        const popup = document.getElementById('popup-success');
        if (popup) {
            popup.style.display = 'block';
        }
        const waitingTime = 4000;
        setTimeout(() => {
            popup?.click();
        }, waitingTime);
    }

    const changeName = () => {
        const newUsername = (document.getElementById('profile-new-name') as HTMLInputElement).value;
        const password = (document.getElementById('profile-new-name-password') as HTMLInputElement).value;
        try {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('http://localhost:5000/api/educator', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        newUsername: newUsername,
                        password: password
                    })
                }).then(response => {
                    if (response.status === 200) {
                        setName(newUsername);
                        closePopup();
                        displaySuccessPopup();
                    }
                });
            }
            else {
                console.log('Token not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeEmail = () => {
        const newEmail = (document.getElementById('profile-new-email') as HTMLInputElement).value;
        const password = (document.getElementById('profile-new-email-password') as HTMLInputElement).value;
        try {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('http://localhost:5000/api/educator', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        newEmail: newEmail,
                        password: password
                    })
                }).then(response => {
                    if (response.status === 200) {
                        setEmail(newEmail);
                        closePopup();
                        displaySuccessPopup();
                    }
                    else {
                        console.log('Error');
                    }
                });
            }
            else {
                console.log('Token not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changePassword = () => {
        const oldPassword = (document.getElementById('oldPassword') as HTMLInputElement).value;
        const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
        const newPassword2 = (document.getElementById('newPassword2') as HTMLInputElement).value;

        if(newPassword !== newPassword2) {
            console.log('Passwords do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('http://localhost:5000/api/educator', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: oldPassword,
                        newPassword: newPassword
                    })
                }).then(response => {
                    if (response.status === 200) {
                        closePopup();
                        displaySuccessPopup();
                    }
                    else {
                        console.log('Error');
                    }
                });
            }
            else {
                console.log('Token not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeChildrenPassword = () => {
        const newChildrenPassword = (document.getElementById('newChildrenPassword') as HTMLInputElement).value;
        const realPassword = (document.getElementById('realPassword') as HTMLInputElement).value;

        try {
            const token = localStorage.getItem('token');
            if (token) {
                fetch('http://localhost:5000/api/educator', {
                    method: 'PATCH',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: realPassword,
                        newChildrenLogoutPassword: newChildrenPassword
                    })
                }).then(response => {
                    if (response.status === 200) {
                        closePopup();
                        displaySuccessPopup();
                    }
                    else {
                        console.log('Error');
                    }
                });
            }
            else {
                console.log('Token not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeNamePopup = () => {
        const popup = document.getElementById('popup-change-name');
        if (popup) {
            popup.style.display = 'block';
        }
    }

    const changeEmailPopup = () => {
        const popup = document.getElementById('popup-change-email');
        if (popup) {
            popup.style.display = 'block';
        }
    }
    const changePasswordPopup = () => {
        const popup = document.getElementById('popup-change-password');
        if (popup) {
            popup.style.display = 'block';
        }
    }

    const changeChildrenPasswordPopup = () => {
        const popup = document.getElementById('popup-change-children-password');
        if (popup) {
            popup.style.display = 'block';
        }
    }

    const sucessPopupClose = () => {
        const popup = document.getElementById('popup-success');
        if (popup) {
            popup.style.display = 'none';
        }
    }


  return (
    <main>
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profile</h1>
            </div>
            <div className="profile-content">
                <div className="profile-content-paragraph">
                    <div className="profile-content-label"> Name : </div>
                    <div className="profile-content-get" >{name}</div>
                    <div className="change-profile" onClick={changeNamePopup}> Change </div>
                </div>
                <div className="profile-content-paragraph">
                    <div className="profile-content-label"> Email : </div>
                    <div className="profile-content-get" >{email} </div>
                    <div className="change-profile" onClick={changeEmailPopup}> Change </div>
                </div>
            </div>
            <div className="profile-password">
                <a className="change-profile" onClick={changePasswordPopup}> Change Password </a>
                <a className="change-profile" onClick={changeChildrenPasswordPopup}> Change Children Password </a>
            </div>
        </div>
        <div className="btn-profile-back">
             <ButtonAppComponent content="Back" action={goToWelcome} type={"classic"}/>
        </div>
        <div className='popup-profile' id="popup-change-name">
            <div className='popup-profile-content'>
                <div className="popup-profile-css">
                    <h1>Change Name</h1>
                    <div className="popup-profile-input-container">
                        <input id="profile-new-name" type="text" placeholder="New Name"/>
                        <input id="profile-new-name-password" type="password" placeholder="Password"/>
                    </div>
                    <ButtonAppComponent content="Change" action={changeName} type={"classic"}/>
                    <div className="profile-change-popup-close">
                        <img src={Close} onClick={closePopup} alt="close" className="profile-change-popup-close-img"></img>
                    </div>
                </div>
            </div>
        </div>
        <div className='popup-profile' id="popup-change-email">
            <div className='popup-profile-content'>
                <div className="popup-profile-css">
                    <h1>Change Email</h1>
                    <div className="popup-profile-input-container">
                        <input id="profile-new-email" type="text" placeholder="New Email"/>
                        <input id="profile-new-email-password" type="password" placeholder="Password"/>
                    </div>
                    <ButtonAppComponent content="Change" action={changeEmail} type={"classic"}/>
                    <div className="profile-change-popup-close">
                        <img src={Close} onClick={closePopup} alt="close" className="profile-change-popup-close-img"></img>
                    </div>
                </div>
            </div>
        </div>
        <div className='popup-profile' id="popup-change-password">
            <div className='popup-profile-content'>
                <div className="popup-profile-css">
                    <h1>Change Password</h1>
                    <div className="popup-profile-input-container">
                        <input id="oldPassword" type="password" placeholder="Old Password"/>
                        <input id="newPassword" type="password" placeholder="New Password"/>
                        <input id="newPassword2" type="password" placeholder="New Password Again"/>
                    </div>
                    <ButtonAppComponent content="Change" action={changePassword} type={"classic"}/>
                    <div className="profile-change-popup-close">
                        <img src={Close} onClick={closePopup} alt="close" className="profile-change-popup-close-img"></img>
                    </div>
                </div>
            </div>
        </div>
        <div className='popup-profile' id="popup-change-children-password">
            <div className='popup-profile-content'>
                <div className="popup-profile-css">
                    <h1>Change Children Password</h1>
                    <div className="popup-profile-input-container">
                        <input id="newChildrenPassword" type="password" placeholder="Children New Password"/>
                        <input id="realPassword" type="password" placeholder="Password"/>
                    </div>
                    <ButtonAppComponent content="Change" action={changeChildrenPassword} type={"classic"}/>
                    <div className="profile-change-popup-close">
                        <img src={Close} onClick={closePopup} alt="close" className="profile-change-popup-close-img"></img>
                    </div>
                </div>
            </div>
        </div>
        <div className="popup-success" id="popup-success" onClick={sucessPopupClose}>
            <div className="popup-success-content">
                <h1>Successful change !</h1>
            </div>
        </div>
    </main>
  );
}

export default ProfileComponent;