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

    const {skills} = useContext(IconContext)

    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("")
    const [location, setLocation] = useState("")

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)
    const skills1 = skills[0]
    const icon1 = null;

    const submitHandler = (req,res) => {
        console.log(skills[0])
        axios.post("http://localhost:8000/api/createJob", {
            //need creator id and name
            createdBy:{
                id:loggedUser1._id,
                name:loggedUser1.name
            },
            skills1,
            company,
            icon1,
            position,
            description,
            location
        })
        .then((res) => {
            console.log(res)
        }).catch((err)=>console.log(err))
    }

    return(
        <Container className="p-5">
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
                    <LangForm />
                    <FrameForm />
                </Col>
            </Row>
            
        </Container>
    )
}

export default JobForm;