import React, { useContext, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import '../App.css'
import ProgressBar from './ProgressBar';
import LangForm from './Wizard/LangForm';
import FrameForm from './Wizard/FrameForm';
import UploadForm from './Wizard/UploadForm'
// import ResumeForm from './Wizard/ResumeForm';
import SiteForm from './Wizard/SiteForm';
import TypeForm from './Wizard/TypeForm';
import StackForm from './Wizard/StackForm';
import emptyprofile from '../static/emptyprofile.png'
import {IconContext} from './IconProvider';
import {
    // Container,
    // Col,
    Row,
    // Form,
    // Button,
    // Navbar,
    // Nav
} from 'react-bootstrap';

const DevForm = (props) => {

    // const setBio = (e) =>{
    //     setBioValue(e.target.value)
    //     if(!bioValue)
    //     setProgressValue(progressValue +8.5)
    // }

    const {icons, progress} = useContext(IconContext);

    const [enumObj] = icons;
    const [progressValue, setProgressValue] = progress;
    
    const [iconComp, setIconComp] = useState("typeForm");

    const [imageKey, setImageKey] = useState("")

    const [type, setType] = useState("")
    const [stackType, setStackType] = useState("")
    const [skillsArr,setSkillsArr] = useState([])

    const setSkill = (val) =>{
            setProgressValue(progressValue + 8.3);
            setSkillsArr([...skillsArr,val]);   
        } 

    const navigate = useNavigate()
        
        const submitForm = () => {
            navigate('/dev/new/2/')
            .then((res)=>res.json(res))
            .catch((err)=>console.log(err))
        }

        const logoutHandler = () => {
            localStorage.clear()
            axios.get('http://localhost:8000/api/logout')
            .then((res)=>{
                navigate('/login')
            }).catch((err)=>console.log(err))
        }

    return(
        <>
            {/* <Row>
                <Col className="col-sm-12 m-0 p-0"> */}
                {/* <Navbar className="bg-success">
                        <Navbar.Brand>Dev Site</Navbar.Brand>
                        <Nav variant="tabs" className="ml-auto">
                        <Nav.Link onclick={logoutHandler}>Logout</Nav.Link>
                        </Nav>
                    </Navbar> */}
                {/* </Col>
            </Row> */}
            <Row className="ml-5 pt-3 justify-content-center">
                <h2 className="">Complete your profile</h2>  
                <ProgressBar progress={props.progress} className="col-10 col-sm-4"/> 
            </Row>

            {(() => {

                switch (iconComp) {
                    case 'typeForm':
                        return(
                            <TypeForm type={type} setType={setType} setIconComp={setIconComp} />
                        )
                    case 'stackForm':
                        return(
                            <StackForm setStackType={setStackType} setIconComp={setIconComp} progressValue ={progressValue} setProgressValue={setProgressValue} />
                        )            
                    case 'langForm':
                        return (
                            <LangForm iconComp={iconComp} setIconComp={setIconComp} skillsArr={skillsArr} setSkillsArr={setSkillsArr} />
                        )
                    case 'frameForm':
                        return (
                            <FrameForm setIconComp={setIconComp} skillsArr={skillsArr} setSkillsArr={setSkillsArr} />
                        )
                    case 'uploadForm':
                        return (
                            <UploadForm setProfilePhoto={setImageKey} setIconComp={setIconComp} progressValue ={progressValue} setProgressValue={setProgressValue}/>
                        )
                    // case 'bioForm':
                    //     return (
                    //         <ResumeForm setIconComp={setIconComp} setBioValue={setBioValue} />
                    //     )
                    case 'siteForm':
                        return (
                            <SiteForm stackType={stackType} imageKey={imageKey} skillsArr={skillsArr} type={type} progressValue ={progressValue} setProgressValue={setProgressValue}/>
                        )
                    default:
                        return (
                            <div>Something went wrong.</div>
                        )
                }

                })()}

            <div className="form-box h-100">
                <form onSubmit={submitForm}>
                    <div className="pic-box mb-5">
                        
                        <div>
                            <img src={ imageKey ? "http://localhost:8000/images/" + imageKey : emptyprofile} alt="" className="profile-photo" />
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
        </>   
    )
}

export default DevForm;