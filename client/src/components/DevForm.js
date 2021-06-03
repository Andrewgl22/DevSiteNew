import React, { useContext, useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Redirect} from 'react-router-dom'
import '../App.css'
import ProgressBar from './ProgressBar';
import LangForm from './LangForm';
import FrameForm from './FrameForm';
import UploadForm from './UploadForm'
import ResumeForm from './ResumeForm';
import SiteForm from './SiteForm';
import TypeForm from './TypeForm';
import StackForm from './StackForm';
import {IconContext} from './IconProvider';
import {
    Container,
    Col,
    Row,
    Form,
    Button,
    Navbar,
    Nav
} from 'react-bootstrap';

const DevForm = (props) => {

    const setBio = (e) =>{
        setBioValue(e.target.value)
        if(!bioValue)
        setProgressValue(progressValue +8.5)
    }

    const {icons, bio, skills, progress} = useContext(IconContext);
    const [enumObj, setEnumObj] = icons;
    const [bioValue, setBioValue] = bio;
    const [skillsArr, setSkillsArr] = skills;
    const [progressValue, setProgressValue] = progress;
    const [iconComp, setIconComp] = useState("typeForm");

    const [profilePhoto, setProfilePhoto] = useState("")
  
    const [type, setType] = useState("")
    const [stackType, setStackType] = useState("")

    const setSkill = (val) =>{
            setProgressValue(progressValue + 8.3);
            setSkillsArr([...skillsArr,val]);   
        } 
        
        const submitForm = () => {
            navigate('/dev/new/2/')
            .then((res)=>res.json(res))
            .catch((err)=>console.log(err))
        }

    return(
        <div className="App">
               <Navbar style={{backgroundColor:"seagreen"}}>
                <Navbar.Brand>Dev Site</Navbar.Brand>
                <Nav variant="tabs" className="ml-auto">
                <Nav.Link onclick={(e)=>axios.post('http://localhost:8000/logout')}>Logout</Nav.Link>
                </Nav>
            </Navbar>
            <Row className="ml-5 mt-2 justify-content-center">
                <h2 className="inB">Complete your profile</h2>  
                <ProgressBar progress={props.progress} className="inB"/> 
            </Row>

            {(() => {
  
                switch (iconComp) {
                    case 'typeForm':
                        return(
                            <TypeForm type={type} setType={setType} setIconComp={setIconComp}/>
                        )
                    case 'stackForm':
                        return(
                            <StackForm setStackType={setStackType} setIconComp={setIconComp} />
                        )            
                    case 'langForm':
                        return (
                            <LangForm iconComp={iconComp} setIconComp={setIconComp} />
                        )
                    case 'frameForm':
                        return (
                            <FrameForm setIconComp={setIconComp} />
                        )
                    case 'photoForm':
                        return (
                            <UploadForm setProfilePhoto={setProfilePhoto} setIconComp={setIconComp} />
                        )
                    case 'bioForm':
                        return (
                            <ResumeForm setIconComp={setIconComp} setBioValue={setBioValue} />
                        )
                    case 'siteForm':
                        return (
                            <SiteForm />
                        )
                    default:
                        return (
                        <div>Something went wrong.</div>
                        )
                }

                })()}

            <div className="form-box">
                <form onSubmit={submitForm}>
                    <div className="pic-box">
                        
                        <div>
                            <img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="profile-photo" />
                            <div className="card-titles">
                                <h4>Andrew Lederman</h4>
                                <h6>{stackType}</h6>
                            </div>
                        </div>

                    
                        <div className="innerPic mt-2">
                           
                      
                           
                            <div>
                            {skillsArr.map((skill,idx)=>(
                                <>
                                    <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" className="mb-2 mr-1" value={`${skill}`} />
                                </> 
                            ))}
                            </div>
                            
                          
                        </div>
                    </div><br></br>
                </form>
                
   
                
            </div>
        </div>
        
    )
}

export default DevForm;