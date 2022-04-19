import React, {useState, useContext} from 'react';
import {IconContext} from './IconProvider';
import {Link, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const {user} = useContext(IconContext);

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
        let response = await axios.post('http://localhost:8000/api/login',{
            email,
            password
        },{withCredentials:true})
        let logged = await axios.get("http://localhost:8000/api/loggedUser", {withCredentials: true})
        console.log(`Email is: ${logged.data.email}`);
        localStorage.setItem('loggedUser', JSON.stringify(logged.data))
        console.log(`Logged in user is: ${logged.data.name}`)
        history.push('/dashboard')
    } catch(err) {
        const errorResponse = err.response.data.message;
        setErrors(errorResponse);
        console.log('error')
    }
    }

    return(
        <Container className="jumbotron" fluid>
            <Row className="d-flex justify-content-center h-100 align-items-center">
                <Col className="col-8 col-sm-4 vh-100">
                <h1>Login</h1>
                <Link to="/register">Register Here</Link>
                
                    <Form className="mx-auto" type="">
                        <p className="text-danger">{errors}</p>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button type="submit" onClick={LoginHandler}>Login</Button>
                    </Form>
                </Col>
            </Row>
        
        </Container>
    )
}

export default Login;