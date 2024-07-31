import "./ButtonAppComponent.css";

interface ButtonAppComponentProps {
    content: string,
    action?: () => void
    type: string
}

function ButtonAppComponent(props: ButtonAppComponentProps){
  return (
      (props.type === "delete") ? <button className="button-app-delete" onClick={props.action}>{props.content}</button> :
        (props.type === "play") ? <button className="button-app-play" onClick={props.action}>{props.content}</button> :
            <button className="button-app" onClick={props.action}>{props.content}</button>
  );
}


export default ButtonAppComponent;