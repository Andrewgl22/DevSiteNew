import React from 'react';

const UploadForm = ({setProfilePhoto, setIconComp}) => {

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
        // const result = await axios.post('http://localhost:8000/api/upload');
        // console.log(result)
        // setProfilePhoto(result)
        setIconComp('siteForm')
        } catch {
            console.log('there was an error in the submit handler')
        }
    }

    return(
        <div className="form-box">
            <h2>Submit your resume</h2>
            <form onSubmit={submitHandler} encType='multipart/form-data' method='POST'>
            <input type='file' name='photo' />
            <button type='submit'>Submit</button>
            </form>
        </div>

    )

}

export default UploadForm;