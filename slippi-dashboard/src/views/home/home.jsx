import './home.css';
import {Button} from "react-bootstrap";

const updateFiles = (e) => {
    console.log('test');
    this.setState({ ...this.state, slippiFiles: e.target.files });
    // useRef().current.click();
}

const processFiles = () => {
    console.log(this.state.slippiFiles);
    // useRef().current.click();
}

function Home() {
    return (
        <div className="Home center-text">
            <header className="home-header">
                <div className="large-bold-header">
                    Welcome to Slippi Dashboard
                </div>
            </header>
            <div className="mt-50">
                <div>
                    <input type="file" name="slippiFiles" multiple="multiple" onChange={updateFiles}/>
                </div>
            </div>
            <div className="mt-50">
                <Button variant="primary"
                        size="lg"
                        active
                        type='file'
                        onClick={processFiles}>
                    Process selected files
                </Button>{' '}
            </div>
        </div>
    );
}

export default Home;
