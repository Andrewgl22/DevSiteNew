import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {IconContext} from '../IconProvider';

const BioForm = ({type, stackType, imageKey}) => {

    const history = useHistory();

    const {user, bio, skills} = useContext(IconContext)
    const [loggedUser] = user;

    const [github, setGithub] = useState("")
    const [website, setWebsite] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()      
        try {
        const result = await axios.put('http://localhost:8000/api/update/' + loggedUser._id,{
            type,
            stackType, 
            skills, 
            imageKey, 
            //resume,
            bio, 
            github,
            website
        })
        console.log(result.data)
        history.push('/dashboard')
            } catch {
                console.log('not working')
            }
    }

    return(
        <div className="form-box">
        <h3>Add links to your work</h3>
                <label>Github: </label>
                <input type="text" onChange={(e)=>setGithub(e.target.value)}></input><br></br>
                <label>Personal Site: </label>
                <input type="text" onChange={(e)=>setWebsite(e.target.value)}></input><br></br>
           <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default BioForm;
