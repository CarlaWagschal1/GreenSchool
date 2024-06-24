import "./ButtonAppComponent.css";

interface ButtonAppComponentProps {
    content: string,
    action?: () => void
}

function ButtonAppComponent(props: ButtonAppComponentProps){
  return (
    <button className="button-app">{props.content}</button>
  );
}


export default ButtonAppComponent;