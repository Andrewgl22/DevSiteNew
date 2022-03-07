import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import {IconContext} from './IconProvider';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
// import CodeNews from './CodeNews'
import Header from './Header'
import LangForm from './Wizard/LangForm';
import FrameForm from './Wizard/FrameForm';

const JobForm = () => {

    const [skillsArr,setSkillsArr] = useState([])

    const setSkill = (val) =>{
        setSkillsArr([...skillsArr,val]);   
    } 

    const history = useHistory()

    const {icons} = useContext(IconContext)
    const [enumObj] = icons

    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)
    
    const skills1 = icons[0]
    const icon1 = null;


    const submitHandler = (req,res) => {
        console.log(icons[0])
        axios.post("http://localhost:8000/api/createJob", {
            //need creator id and name
            createdBy:{
                id:loggedUser1._id,
                name:loggedUser1.name
            },
            skills:skillsArr,
            company,
            position,
            description,
            location
        })
        .then((res) => {
            history.push('/dashboard')
            console.log(res)
        }).catch((err)=>console.log(err))
    }

    return(
        <Container className="p-5 bg-light" fluid>
            <Row>
                <Col className="col-md-6">
                <h3>Add A Job</h3>
                
                <Link to="/dashboard">Back to Dashboard</Link>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Position" onChange={(e)=> setPosition(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="textarea" placeholder="Description" onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control type="text" placeholder="Company" onChange={(e)=> setCompany(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Location" onChange={(e)=> setLocation(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Control type="hidden" name="userId" value={loggedUser1._id} />
                        <Button onClick={submitHandler}>Submit</Button>
                    </Form>
                </Col>
                <Col>
                <div className="form-box">
            <h2>Technologies</h2>
            <div className="iconBox w-75">
            <img src={enumObj.html} alt="" height="40" width="40" value="html" onClick={(e)=>setSkill('html')}  />
                <img src={enumObj.css} alt="" height="40" width="40" value="css" onClick={()=>setSkill('css')} />
                <img src={enumObj.js} alt="" height="40" width="40" value="js" onClick={()=>setSkill('js')} />
                <img src={enumObj.ruby} alt="" height="40" width="40" value="ruby" onClick={()=>setSkill('ruby')} />
                <img src={enumObj.python} alt="" height="40" width="40" value="python" onClick={()=>setSkill('python')} />
                <img src={enumObj.java} alt="" height="40" width="40" value="java" onClick={()=>setSkill('java')} />
                <img src={enumObj.swift} alt="" height="40" width="40" value="swift" onClick={()=>setSkill('swift')} />
                <img src={enumObj.angular} alt="" height="40" width="40" value="html" onClick={()=>setSkill('angular')} />
                    <img src={enumObj.bootstrap} alt="" height="40" width="40" value="css" className="mr-1" onClick={()=>setSkill('bootstrap')} />
                    <img src={enumObj.django} alt="" height="40" width="40" value="js" onClick={()=>setSkill('django')} />
                    <img src={enumObj.react} alt="" height="40" width="40" value="ruby" onClick={()=>setSkill('react')} />
                    <img src={enumObj.jquery} alt="" height="40" width="40" value="python" onClick={()=>setSkill('jquery')} />
                    <img src={enumObj.node} alt="" height="40" width="40" value="java" onClick={()=>setSkill('node')} />
                    <img src={enumObj.vue} alt="" height="40" width="40" value="java" onClick={()=>setSkill('vue')} />
            </div>

        </div>
        <div>
                            {skillsArr.map((skill,idx)=>(
                                <>
                                    <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" className="mb-2 mr-1" value={`${skill}`} />
                                </> 
                            ))}
                            </div>
                </Col>
            </Row>
            
        </Container>
    )
}

export default JobForm;