import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from 'axios';

import './ChildrenLogoutComponent.css';

import Close from '../../../assets/close.png';
import {useNavigate} from "react-router-dom";

interface ChildrenLogoutComponentProps {
  cancelLogout: (cancel: boolean) => void;
}

function ChildrenLogoutComponent({cancelLogout}: ChildrenLogoutComponentProps) {
    const navigate = useNavigate();

    const LogOut = async () => {
        console.log('Log Out')

        const password = document.querySelector('input') as HTMLInputElement;
        if (password) {
            try {
                const data = {
                    password: password.value,
                    token: localStorage.getItem('token')
                };
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
                }


                const rep = await axios.post('http://localhost:5000/api/children/logout', data, {headers: headers});
                console.log(rep);
                if(rep.status === 200){
                    localStorage.removeItem('childrenToken');
                    navigate('/children-manager');
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleCancel = () => {
    cancelLogout(true);
    }

  return (
      <div className="children-logout">
          <div className="children-logout-content">
            <h1>Please enter your log out password</h1>
            <input type={"password"} />
            <ButtonAppComponent content="LOG OUT" action={LogOut} type={"classic"}></ButtonAppComponent>
          </div>
          <img className="close-img" src={Close} alt={"close"} onClick={handleCancel}/>
      </div>


  );
}

export default ChildrenLogoutComponent;