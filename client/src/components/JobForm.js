import React, {useState, useContext} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {IconContext} from './IconProvider';
import {
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';

const JobForm = () => {

    const navigate = useNavigate()

    const [skillsArr,setSkillsArr] = useState([])

    const setSkill = (val) =>{
        if(skillsArr.length===10){return}
        if(skillsArr.includes(val)){return}
        setSkillsArr([...skillsArr,val]);   
    } 

    const {icons} = useContext(IconContext)
    const [enumObj] = icons

    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")
    const [errors, setErrors] = useState()

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)
    
    // const skills1 = icons[0]
    // const icon1 = null;


    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const result = await axios.post("http://localhost:8000/api/createJob", {
                createdBy:{
                    id:loggedUser1._id,
                    name:loggedUser1.name
                },
                company,
                position,
                description,
                location,
                skills:skillsArr
                })
                navigate('/dashboard')
        } catch(err) {
            debugger;
            const errorResponse = err.response.data.errors;
            console.log(errorResponse)
            
            setErrors(errorResponse);
        }
    }

    return(     
            <Row className="mx-auto p-4 mt-5 justify-content-center">
                <Col className="col-11 col-sm-4 mt-3">
                    <h3>Add A Job</h3>
                        <Form>
                        {/* {errors.map((err, index) =><b><p key={index} class="text-danger">{err}</p></b>)} */}
                            <Form.Group>
                                <Form.Label>Position{errors && errors.position ? <p className="text-danger">{errors.position.message}</p> : null }</Form.Label>
                                <Form.Control type="text" placeholder="Position" onChange={(e)=> setPosition(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description{errors && errors.description ? <p className="text-danger">{errors.description.message}</p> : null }</Form.Label>
                                <Form.Control type="textarea" placeholder="Description" onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Company {errors && errors.company ? <p className="text-danger">{errors.company.message}</p> : null }</Form.Label>
                                <Form.Control type="text" placeholder="Company" onChange={(e)=> setCompany(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Location {errors && errors.location ? <p className="text-danger">{errors.location.message}</p> : null }</Form.Label>
                                <Form.Control type="text" placeholder="Location" onChange={(e)=> setLocation(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Control type="hidden" name="userId" value={loggedUser1._id} />
                        </Form>
                    </Col>
                <Col className="text-center col-11 col-sm-4 mt-3">
                        <h2>Choose up to 10 Technologies</h2>
                        <div className="iconBox col-8 mx-auto">
                            <img src={enumObj.html} alt="" height="40" width="40" value="html"  className="m-1" onClick={(e)=>setSkill('html')}  />
                                <img src={enumObj.css} alt="" height="40" width="40" value="css" className="m-1" onClick={()=>setSkill('css')} />
                                <img src={enumObj.js} alt="" height="40" width="40" value="js" className="m-1" onClick={()=>setSkill('js')} />
                                <img src={enumObj.ruby} alt="" height="40" width="40" value="ruby" className="m-1" onClick={()=>setSkill('ruby')} />
                                <img src={enumObj.python} alt="" height="40" width="40" value="python" className="m-1" onClick={()=>setSkill('python')} />
                                <img src={enumObj.java} alt="" height="40" width="40" value="java" className="m-1" onClick={()=>setSkill('java')} />
                                <img src={enumObj.swift} alt="" height="40" width="40" value="swift" className="m-1" onClick={()=>setSkill('swift')} />
                                <img src={enumObj.angular} alt="" height="40" width="40" value="html" className="m-1" onClick={()=>setSkill('angular')} />
                                <img src={enumObj.bootstrap} alt="" height="40" width="40" value="css" className="m-1" onClick={()=>setSkill('bootstrap')} />
                                <img src={enumObj.django} alt="" height="40" width="40" value="js" className="m-1" onClick={()=>setSkill('django')} />
                                <img src={enumObj.react} alt="" height="40" width="40" value="ruby" className="m-1" onClick={()=>setSkill('react')} />
                                <img src={enumObj.jquery} alt="" height="40" width="40" value="python" className="m-1" onClick={()=>setSkill('jquery')} />
                                <img src={enumObj.node} alt="" height="40" width="40" value="java" className="m-1" onClick={()=>setSkill('node')} />
                                <img src={enumObj.vue} alt="" height="40" width="40" value="java" className="m-1" onClick={()=>setSkill('vue')} />
                        </div>
                    <Form.Label> {errors && errors.skills ? <p className="text-danger">{errors.skills.message}</p> : null }</Form.Label>
                    <div className="iconBox col-8 mx-auto mb-3" style={{height:"18vh"}}>
                        {skillsArr.map((skill,idx)=>(
                            <>
                                <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" className="m-1" value={`${skill}`} />
                            </> 
                        ))}
                    </div>
                <Button onClick={submitHandler}>Submit</Button>
                </Col>
            </Row>
    )
}

export default JobForm;