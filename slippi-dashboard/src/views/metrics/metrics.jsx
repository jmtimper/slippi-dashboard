import './metrics.css';
import SelectGame from "../../components/selectGame/selectGame";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";

const Metrics = () => {
    const [games, setGames] = useState([])
    const [selectedGame, setSelectedGame] = useState(games[0]);

    useEffect(async () => {
        await axios.get('/fetch/files/names')
            .then(res => {
                    setGames(res.data.games)
                    setSelectedGame(games[0])
                }
            ).catch(e => {
                console.log(e)
            })
    }, []);

    const processMetrics = () => {
        axios.get('/fetch/files/specific', { params:
                { file: selectedGame }
        }).then(res => {
            console.log(res.data)
        }).catch(e => console.log(e))
    }

    return (
        <Fragment>
            <div className="seeding">
                <div>Metrics</div>
                <form onSubmit={processMetrics}>
                    <SelectGame games={games} selectedGame={selectedGame} setSelectedGame={setSelectedGame}></SelectGame>
                    <input type='submit' value={'Process Game'}/>
                </form>
            </div>
        </Fragment>
    );
}

export default Metrics;
