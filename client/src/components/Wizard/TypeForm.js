import React from 'react';

const TypeForm = ({type, setType, setIconComp}) => {

    const empHandler = () => {
        setType('employer')
        setIconComp('siteForm')
    }

    const devHandler = () => {
        setType('dev')
        setIconComp('stackForm')
    }

    return(
        <div className="form-box">
            <p>Are you a...</p>

            <input type="checkbox" id="employer" name="employer" onClick={empHandler}/>
            <label for="employer">Employer</label>
        
            <input type="checkbox" id="dev" name="dev" onClick={devHandler} />
            <label for="dev">Developer</label>
            
        </div>
    )
}

export default TypeForm;