import React from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const StackForm = ({setIconComp, setStackType, progressValue, setProgressValue}) => {

    // const empHandler = () => {
    //     setIconComp('langForm')
    // }

    // const devHandler = () => {
    //     setIconComp('stackForm')
    // }

    const submitHandler = (e) => {
        setProgressValue(progressValue + 10)
        setIconComp('langForm')
    }

    return(
        <div className="form-box">
            <p>Are you a...</p>

            <select onChange={(e)=>setStackType(e.target.value)}>
                <option>Back-End Developer</option>
                <option>Front-End Developer</option>
                <option>Full-Stack Developer</option>
            </select><br></br>

            <Button className="mt-4" onClick={submitHandler}>Submit</Button>
            
        </div>
    )
}

export default StackForm;