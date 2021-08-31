import './uploadFiles.css';
import {Button} from "react-bootstrap";
import {useState} from "react";

const UploadFiles = ({addFile}) => {
    const [selectedFiles, setSelectedFiles] = useState([])

    const handleChange = (event ) => {
        setSelectedFiles(event.target.value);
        console.log(event.target.files)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // addFile(selectedFiles);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="file" multiple={true} value={selectedFiles} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        // <div>
        //     <div className="mt-50">
        //         <div>
        //             <input type="file" multiple="multiple" onChange={updateFiles}/>
        //         </div>
        //     </div>
        //     <div className="mt-50">
        //         <Button variant="primary"
        //                 size="lg"
        //                 active
        //                 type='file'
        //                 onClick={updateFiles}>
        //             Process selected files
        //         </Button>{' '}
        //     </div>
        // </div>
    );
}

export default UploadFiles;
