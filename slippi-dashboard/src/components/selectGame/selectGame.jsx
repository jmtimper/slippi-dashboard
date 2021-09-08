import './selectGame.css';

const SelectGame = ({games, selectedGame, setSelectedGame}) => {

    const handleSelection = (event) => {
        event.preventDefault();
        setSelectedGame(event.target.value)
    }

    return (
        <select className="form-select" onChange={handleSelection} value={selectedGame}>
            {
                games.map(el => <option value={el} key={el}> {el} </option>)
            }
        </select>
    );
}

export default SelectGame;
