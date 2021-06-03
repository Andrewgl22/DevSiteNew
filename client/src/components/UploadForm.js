import React, {useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import FormData from 'form-data';

const UploadForm = ({setProfilePhoto, setIconComp}) => {

    const [file, setFile] = useState(null);

    let formData = new FormData();

    const saveFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        formData.append("photo", file)
    }

    // const request = {
    //     method: "POST",
    //     body: formData
    // };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // }
        const result = await axios.post('http://localhost:8000/api/upload', formData);
        console.log("This is the result:" + result)
        setProfilePhoto(result.key)
        setIconComp('resumeForm')
        } catch {
            console.log('there was an error in the submit handler')
        }
    }



    return(
        <div className="form-box">
            <h2>Submit your profile photo</h2>
            {/* <form action="http://localhost:8000/api/upload" encType='multipart/form-data' method='POST'> */}
            <form onSubmit={submitHandler}>
            <input type='file' name='photo' onChange={saveFile}/>
            <button type='submit'>Submit</button>
            </form>
        </div>
  
    )

}

export default UploadForm;