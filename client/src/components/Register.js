import React, { useState, useContext } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {IconContext} from './IconProvider'
import axios from 'axios';
import '../App.css';
import {
    Container, 
    Row, 
    Col,
    Form,
    Button
    } from 'react-bootstrap';

    

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})

    const history = useHistory();

    const {user} = useContext(IconContext);
    const [loggedUser, setLoggedUser] = user;


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const reg = await axios.post("http://localhost:8000/api/register",{
                name,
                email,
                address,
                city,
                state,
                password,
                confirmPassword
            },{ withCredentials: true})
            console.log(reg.data)
            const login = await axios.post('http://localhost:8000/api/login',{
                    email,
                    password
                },{withCredentials:true})
                console.log(login.data);
                setLoggedUser(login)
                history.push('/')
        } catch(err) {
            console.log(err)
            setErrors(err.response.data.errors)
        }

    }

    return(
        <div className="App">
            
            <Link to="/login">Already a member? Log in here.</Link>
            <Form className="jumbotron m-5 w-50 mx-auto">
            <Form.Group controlId="formBasicEmail" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={(e)=> setName(e.target.value)}/>
                    <Form.Text className="text-muted">
                        You're almost there!
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="johndoe@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        You're almost there!
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="12345 Main Street" onChange={(e)=> setAddress(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We won't share this with anyone
                    </Form.Text>
                </Form.Group>
                <Row>
                <Form.Group controlId="formBasicEmail" className="col-8">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" onChange={(e)=> setCity(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We won't share this with anyone
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="col-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" placeholder="City" onChange={(e)=> setState(e.target.value)}>
                        <option>AL</option>
                        <option>AK</option>
                        <option>AZ</option>
                        <option>AR</option>
                        <option>CA</option>
                        <option>CO</option>
                        <option>CT</option>
                        <option>DE</option>
                        <option>FL</option>
                        <option>GA</option>
                        <option>HI</option>
                        <option>ID</option>
                        <option>IL</option>
                        <option>IN</option>
                        <option>IA</option>
                        <option>KS</option>
                        <option>KY</option>
                        <option>LA</option>
                        <option>ME</option>
                        <option>MD</option>
                        <option>MA</option>
                        <option>MI</option>
                        <option>MN</option>
                        <option>MS</option>
                        <option>MO</option>
                        <option>MT</option>
                        <option>NE</option>
                        <option>NV</option>
                        <option>NH</option>
                        <option>NJ</option>
                        <option>NM</option>
                        <option>NY</option>
                        <option>NC</option>
                        <option>ND</option>
                        <option>OH</option>
                        <option>OK</option>
                        <option>OR</option>
                        <option>PA</option>
                        <option>RI</option>
                        <option>SC</option>
                        <option>SD</option>
                        <option>TN</option>
                        <option>TX</option>
                        <option>UT</option>
                        <option>VT</option>
                        <option>VA</option>
                        <option>WA</option>
                        <option>WV</option>
                        <option>WI</option>
                        <option>WY</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                        We won't share this with anyone
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                </Row>
                <Button onClick={submitHandler}>Submit</Button>
            </Form>
        </div>

    )
}

export default Register;