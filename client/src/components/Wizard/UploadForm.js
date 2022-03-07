import React, {useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const UploadForm = ({setProfilePhoto, setIconComp}) => {

    let reader = new FileReader();

    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState(null);

    const saveFile = (e) => {
        
        setFile(e.target.files[0])   
    }

    //this grabs the loggedUser cookie from localStorage, and converts it from a string into a usable object
    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    // const request = {
    //     method: 'POST',
    //     data:formData,
    //     headers: {"Content-Type": "multipart/form-data"},
    //     accept: "application/json"
    // }

    const url = 'http://localhost:8000/api/upload'

    const submitHandler = async (e) => {
        e.preventDefault();
        let formData = new FormData()
        formData.append("photo", file) 
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        try {
            setLoading(true)
            const result = await axios.post(url, formData, {headers:{"Content-Type": "multipart/form-data"}})
            console.log("The key is" + result.data.imageKey)
            setProfilePhoto(result.data.imageKey)
            setIconComp("siteForm")
            return result.data
        } catch {
            console.log('there was an error in the submit handler')
        }
    }



    return(
        <div className="form-box">
            {loading ? <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
</div> : null}
            <h2>Submit your profile photo</h2>
            <form onSubmit={submitHandler}>
            <input type="hidden" name="id" value={loggedUser1._id}></input>
            <input type='file' name='photo' onChange={saveFile}/>
            <button type='submit'>Submit</button>
            </form>
        </div>
    )

}

export default UploadForm;