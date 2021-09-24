import React from 'react';
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

    const logoutHandler = () => {
        localStorage.clear()
        axios.get('http://localhost:8000/api/logout')
        .then((res)=>{
            history.push('/login')
        }).catch((err)=>console.log(err))
    }

    return(
        <Container fluid className="p-0">
                <Navbar className="mb-3 bg-secondary">
                    <Navbar.Brand><b>DevHyre</b></Navbar.Brand>
                    <Nav className="ml-auto" >
                    <img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="avatar avatar-sm rounded-circle mr-2" style={{height:"45px",width:"45px"}}  />
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/messages/2">Messages</Nav.Link>
                        <Nav.Link onClick={logoutHandler} className="ml-auto">Logout</Nav.Link>
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