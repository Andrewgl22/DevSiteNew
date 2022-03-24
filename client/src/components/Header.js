import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav
} from 'react-bootstrap';
import axios from 'axios';

const Header = () => {
    const history = useHistory();

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)
    // aeaf6051401d7ba03d6e145474d1b21d

    // count of unread messages
    const [count, setCount] = useState()

    const logoutHandler = () => {
        localStorage.clear()
        axios.get('http://localhost:8000/api/logout')
        .then((res)=>{
            history.push('/login')
        }).catch((err)=>console.log(err))
    }

    //look through all chats that have this users ID, find all with unread messages,
    // and count those messages. Function should return the number of messages only.
    // Should be updatable immediately as more message get sent. In a useEffect.

    const countUnreadMessages = () => {
        axios.get('http://localhost:8000/api/count/' + loggedUser1._id)
        .then((res)=>{
            // let obs = Object.values(res)
            // setCount(obs)
            // console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        countUnreadMessages()
    })

    return(
        <Container fluid className="p-0">
                <Navbar className="bg-secondary">
                    <Navbar.Brand><b>DevHyre</b></Navbar.Brand>
                    <Nav className="ml-auto" >
                    <img src={"http://localhost:8000/images/" + loggedUser1.imageKey} alt="" className="avatar avatar-sm rounded-circle mr-2" style={{height:"45px",width:"45px"}}  />
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/messages/2">Messages<span className="badge counter">0</span></Nav.Link>    
                        <Nav.Link onClick={logoutHandler} className="ml-auto">Logout</Nav.Link>
                    </Nav>
                </Navbar>
        </Container>
    )
}

export default Header;