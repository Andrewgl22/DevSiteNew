import React, { useState, useContext } from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {IconContext} from './IconProvider'
import axios from 'axios';
import '../App.css';
import { states } from '../utils/constants';
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
            let regUser = {
                name,
                email,
                address,
                city,
                state,
                password,
                confirmPassword
            }
            console.log('Register user data:')
            console.log(regUser);

            const reg = await axios.post("http://localhost:8000/api/register", regUser, { withCredentials: true})
            console.log(reg.data)

            const login = await axios.post('http://localhost:8000/api/login',{
                    email,
                    password
                },{withCredentials:true})
                console.log(login.data);
                let logged = await axios.get("http://localhost:8000/api/loggedUser", {withCredentials: true})
                console.log(logged.data)
                localStorage.setItem('loggedUser', JSON.stringify(logged.data))
                console.log(`Logged in user is: ${logged.data.name}`)
                history.push('/wizard')
        } catch(err) {
            console.log(err)
            setErrors(err.response.data.errors)
        }

    }

    return(
        <div className="App">
            
            <Link to="/login">Already a member? Log in here.</Link>
            <Form className="jumbotron m-5 w-50 mx-auto">
                <Form.Group controlId="formBasicName" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={(e)=> setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="johndoe@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="12345 Main Street" onChange={(e)=> setAddress(e.target.value)}/>
                    
                </Form.Group>
                <Row>
                <Form.Group controlId="formBasicCity" className="col-8">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" onChange={(e)=> setCity(e.target.value)}/>
                
                </Form.Group>
                <Form.Group controlId="formBasicState" className="col-4">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" placeholder="State" onChange={(e)=> setState(e.target.value)}>
                        <option>Please Select State</option>
                        {
                            states.map((state) => {
                                /* console.log(`map state: ${state.abbreviation}`); */
                                return (
                                    <option key={state.abbreviation}>{state.abbreviation}</option>
                                )
                            })
                        }
                    </Form.Control>
                    
                </Form.Group>
                <Form.Group className="col-6">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="col-6">
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