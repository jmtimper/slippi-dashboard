import './uploadFiles.css';
import {Button} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";

const UploadFiles = ({addFile}) => {
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleChange = (event) => {
        setSelectedFiles(event.target.value);
        console.log(event.target.files)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFiles);

        try {
            const res = await axios.post('/upload', formData, {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                    // onUploadProgress: progressEvent => {
                    //     setUploadPercentage(
                    //         parseInt(
                    //             Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    //         )
                    //     );
                    // }
                }
            )
        } catch (e) {}
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="file" multiple={true} value={selectedFiles} onChange={handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}

export default UploadFiles;
