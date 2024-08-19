import logoApp from '../../assets/logo-app.png';
import globeApp from '../../assets/globe.png';

import './HeaderComponent.css';


export default function HeaderComponent() {
    return(
        <header>
            <div className="container-header">
                <div className="logo"><img src={logoApp} alt="Logo"></img></div>
                <div className="empty-header"></div>
                <div className="earth-globe"><img id="globe" src={globeApp} alt="Globe"></img></div>
            </div>
        </header>
    )
}