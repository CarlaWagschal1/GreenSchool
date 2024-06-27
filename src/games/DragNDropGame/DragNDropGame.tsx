import "./DragNDropGame.css"

export default function DragNDropGame() {
    return (
        <>
            <div className="trash-images">
                <img className="drag-n-drop-img"
                     src="https://cdn.pixabay.com/photo/2019/08/09/13/51/boat-4395122_1280.jpg" alt="Bateau"/>
            </div>
            <div className="bin-images drag-n-drop-img">
                <img className="drag-n-drop-img"
                     src="https://cdn.pixabay.com/photo/2020/01/20/02/25/nature-4779321_1280.jpg" alt="femme"/>
            </div>
        </>
    )
}


