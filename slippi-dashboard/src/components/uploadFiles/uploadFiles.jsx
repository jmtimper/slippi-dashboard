import './uploadFiles.css';
import {Fragment, useState} from "react";
import axios from "axios";
import Progress from "../progress/progress";
import {Form} from "react-bootstrap";
import {Button} from "bootstrap";


const replayFolder = '../../../public/uploads/';

const UploadFiles = () => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name)
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

            const {fileName, filePath} = res.data;

            setUploadedFile({fileName, filePath});

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
            </form>
            <Progress percentage={uploadPercentage}/>
            <div>
                {message}
            </div>
        </Fragment>
    );
}

export default UploadFiles;
