import React, {useState} from 'react';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
// import CodeNews from './CodeNews'
import Header from './Header'

const JobForm = () => {

    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [company, setCompany] = useState("")

    return(
        <Container className="p-5">
            <Row>
                <Col className="col-md-6 justify-content-center offset-3">
                <h3>Add A Job</h3>
                
                <Link to="/dashboard">Back to Dashboard</Link>
                    <Form>
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
                        <Button>Submit</Button>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}

export default JobForm;