import './home.css';
import UploadFiles from "../../components/uploadFiles/uploadFiles";

const Home = () => {
    return (
        <div className="Home center-text">
            <header className="home-header">
                <div className="large-bold-header">
                    Welcome to the Slippi Dashboard
                </div>
            </header>
            <UploadFiles></UploadFiles>
        </div>
    );
}

export default Home;
