import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { states } from '../utils/constants';
import {
    Row, 
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

    const navigate = useNavigate()

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
            // console.log('Register user data:')
            // console.log(regUser);

            const reg = await axios.post("http://localhost:8000/api/register", regUser, { withCredentials: true})
            console.log(reg.data)
            
            const login = await axios.post('http://localhost:8000/api/login',{
                    email,
                    password
                },{withCredentials:true})
                console.log(login.data);
                let logged = await axios.get("http://localhost:8000/api/loggedUser", {withCredentials: true})
                // console.log(logged.data)
                localStorage.setItem('loggedUser', JSON.stringify(logged.data))
                console.log(`Logged in user is: ${logged.data.name}`)
                navigate('/wizard')
        } catch(err) {
            console.log("comes from register route")
            // console.log(err)
            setErrors(err.response.data.err)
        }
    }

    return(
        <div className="App vh-100 pt-4">
            <div className="d-flex justify-content-around align-items-center">
            <h3>Register for DevHyre</h3>    
            <Link to="/login" className="">Already a member? Log in here.</Link>
            </div>
            <Form className="mx-auto col-10 col-sm-6">
                <Form.Group controlId="formBasicName" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={(e)=> setName(e.target.value)}/>
                    {errors && errors.name ? <p style={{color:"red"}}>{errors.name.message}</p> : null}
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="johndoe@gmail.com" onChange={(e)=> setEmail(e.target.value)}/>
                    {errors && errors.email ? <p style={{color:"red"}}>{errors.email.message}</p> : null}
                </Form.Group>
                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="12345 Main Street" onChange={(e)=> setAddress(e.target.value)}/>
                    {errors && errors.address ? <p style={{color:"red"}}>{errors.address.message}</p> : null}
                </Form.Group>
                <Row>
                <Form.Group controlId="formBasicCity" className="col-8">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" onChange={(e)=> setCity(e.target.value)}/>
                    {errors && errors.city ? <p style={{color:"red"}}>{errors.city.message}</p> : null}
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
                    {errors && errors.state ? <p style={{color:"red"}}>{errors.state.message}</p> : null}

                </Form.Group>
                <Form.Group className="col-6">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                {errors && errors.password ? <p style={{color:"red"}}>{errors.password.message}</p> : null}

                <Form.Group className="col-6">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                </Row>
                <Button className="mb-5" onClick={submitHandler}>Submit</Button>
            </Form>
        </div>

    )
}


export default Register;