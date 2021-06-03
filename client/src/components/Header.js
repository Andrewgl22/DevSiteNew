import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav
} from 'react-bootstrap';

const Header = () => {

    return(
        <Container fluid>
                <Navbar bg='secondary' className="mb-3">
                    <Navbar.Brand><b>DevHyre</b></Navbar.Brand>
                    <Nav className="ml-auto" >
                    <img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="avatar avatar-sm rounded-circle mr-2" style={{height:"45px",width:"45px"}}  />
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/messages/2">Messages</Nav.Link>
                        <Nav.Link href="/logout" className="ml-auto">Logout</Nav.Link>
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