import './uploadFiles.css';
import {Button} from "react-bootstrap";
import {Fragment, useState} from "react";
import axios from "axios";
import Progress from "../progress/progress";
import {SlippiGame, SlpFile} from "@slippi/slippi-js";

const UploadFiles = () => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name)
        // console.log(event.target.files[0], file, filename)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData)

        try {
            const res = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        setUploadPercentage(
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            )
                        );
                    }
                }
            )

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);

            const { fileName, filePath } = res.data;

            console.log(fileName, filePath)

            setUploadedFile({ fileName, filePath });

            const reader = new FileReader();
            const slpFile = new File('Game_20210718T004619.slp')
            // reader.readAsArrayBuffer(new File('Game_20210718T004619.slp'));
            // reader.onload = () => {
            //     if (reader.result) {
            //         const game = new SlippiGame(Buffer.from(reader.result));
            //         console.log(game)
            //     }
            // };

            const file = '../../../public' + filePath;
            // const game = new SlippiGame('Game_20210718T004619.slp');
            //
            // // const settings = game.getSettings();
            // console.log(file, game, game.getSettings());

            setMessage(`File ${fileName} uploaded!`)
        } catch (e) {
            if (e.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(e.response.data.msg);
            }
            setUploadPercentage(0)
        }
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="file" multiple={true} onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit"/>

                <Progress percentage={uploadPercentage} />
            </form>
            <div>
                {message}
            </div>
        </Fragment>
    );
}

export default UploadFiles;
