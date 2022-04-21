import React from 'react';

const TypeForm = ({setType, setIconComp,progressValue, setProgressValue}) => {

    const empHandler = () => {
        setType('employer')
        setIconComp('uploadForm')
    }

    const devHandler = () => {
        setType('dev')
        setIconComp('stackForm')
    }

    return(
        <div className="form-box">
            <h4>Are you a...</h4>

            <input type="checkbox" id="employer" name="employer" onClick={empHandler}/>
            <label for="employer"><h5 className="ml-2">Employer</h5></label>
        
            <input type="checkbox" id="dev" name="dev" className="ml-3" onClick={devHandler} />
            <label for="dev"><h5 className="ml-2">Developer</h5></label>
            
        </div>
    )
}

export default TypeForm;