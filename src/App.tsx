import './App.css'
import GameDisplayPage from "./pages/GameDisplayPage/GameDisplayPage.tsx";
import {Game} from "./interfaces/GameInterface.tsx";

const game1: Game = {
    name: "Game 1"
}

function App() {
    return (
        <main style={{width: "100%", height: "500px"}}>
            <GameDisplayPage game={game1}></GameDisplayPage>
        </main>
    )
}

export default App
