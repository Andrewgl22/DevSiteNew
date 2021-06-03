import React, {useState, useContext} from 'react';
import {IconContext} from './IconProvider';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {navigate} from '@reach/router'
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
    const [errors, setErrors] = useState({});

    const {user} = useContext(IconContext);
    const [loggedUser, setLoggedUser] = user;

    const LoginHandler = async (e) => {
        try{
        e.preventDefault();
        let response = await axios.post('http://localhost:8000/api/login',{
            email,
            password
        },{withCredentials:true})
        console.log(response)
        let logged = await axios.post("http://localhost:8000/api/loggedUser", {withCredentials: true})
        console.log(logged)
        setLoggedUser(logged.data)
        console.log(`Logged in user is: ${loggedUser.name}`)
        history.push('/devSignUp')
    } catch {
        console.log('error')
    }
    }

 


    return(
        <Container className="jumbotron w-50 fluid">
         
            <h1>Welcome Back!</h1>
            <Link to="/register">Register Here</Link>
            <Row>
                <Form className="w-50 mx-auto">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button onClick={LoginHandler}>Login</Button>
                </Form>
            </Row>
         
        </Container>
    )
}

export default Login;