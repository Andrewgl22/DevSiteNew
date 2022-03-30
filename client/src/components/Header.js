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
    const [count, setCount] = useState([])

    const logoutHandler = () => {
        localStorage.clear()
        history.push('/login')
        // axios.get('http://localhost:8000/api/logout')
        // .then((res)=>{
        //     history.push('/login')
        // }).catch((err)=>console.log(err))
    }

    //look through all chats that have this users ID, find all with unread messages,
    // and count those messages. Function should return the number of messages only.
    // Should be updatable immediately as more message get sent. In a useEffect.
    useEffect(()=>{
            axios.get('http://localhost:8000/api/chats/count/' + loggedUser1._id)
            .then((res)=>{
                setCount(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    },[])

    return(
        <Container fluid className="p-0">
                <Navbar className="bg-secondary">
                    <Navbar.Brand><b>DevHyre</b></Navbar.Brand>
                    <Nav className="ml-auto d-flex align-items-center" >
                    <img src={"http://localhost:8000/images/" + loggedUser1.imageKey} alt="" className="avatar avatar-sm rounded-circle mr-2" style={{height:"45px",width:"45px"}}  />
                        <Link to="/dashboard" class="text-light m-1">Dashboard</Link>
                        <Link to="/messages/2" class="text-light m-2">Messages<span class="badge counter">{count}</span></Link>    
                        <Link onClick={logoutHandler} className="ml-auto text-light">Logout</Link>
                    </Nav>
                    {/* <Nav.Item>
                        <Link to='/dashboard' />
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/logout' />
                    </Nav.Item> */}
                </Navbar>
        </Container>
    )
}

export default Header;