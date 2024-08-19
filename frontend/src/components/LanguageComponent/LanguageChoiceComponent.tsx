import { useTranslation} from "react-i18next";
import France from "../../assets/france.png";
import RoyaumeUni from "../../assets/royaume-uni.png";
import Vietnam from "../../assets/vietnam.png";

import './LanguageChoiceComponent.css';

function LanguageChoiceComponent() {
  const { i18n } = useTranslation();
  return (
    <div className="language-choice-component">
        <img src={France} alt="France" onClick={() => i18n.changeLanguage('fr')} />
        <img src={RoyaumeUni} alt="Royaume-Uni" onClick={() => i18n.changeLanguage('en')} />
        <img src={Vietnam} alt="Vietnam" onClick={() => i18n.changeLanguage('vn')} />
    </div>
  );
}

export default LanguageChoiceComponent;