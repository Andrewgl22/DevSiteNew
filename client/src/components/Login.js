import React, {useState, useContext} from 'react';
import {IconContext} from './IconProvider';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const {user} = useContext(IconContext);

    const navigate = useNavigate()

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
        navigate('/dashboard')
    } catch(err) {
        const errorResponse = err.response.data.message;
        setErrors(errorResponse);
        console.log('error')
    }
    }

    return(
        
            <Row className="d-flex justify-content-center h-100 align-items-center">
                <Col className="col-8 col-sm-4 vh-100">
                <div className="align-items-center text-center mt-4 mb-4">
                    <h3 className="">Login to DevHyre</h3>
                    <Link to="/register" className="d-block">Need an account? Register here.</Link>
                </div>
                    <Form className="mx-auto text-center" type="">
                        <p className="text-danger font-weight-bold">{errors}</p>
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
        
       
    )
}

export default Login;