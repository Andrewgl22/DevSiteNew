import React from 'react';
import {Link} from 'react-router-dom';
import DevList from '../components/DevList';
import JobList from '../components/JobList';
import CodeNews from '../components/CodeNews';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

const Dashboard = (props) => {
    console.log(props)

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    return(
        <Container fluid className="App col-12">
            <Row className="d-flex justify-content-center text-center">
                    <h1>Welcome {loggedUser1.name}!</h1>
            </Row>
            <Row>
                    <DevList/>
                    <JobList />
                    <CodeNews />
                    
            </Row>
            <Row>
                <Col >
                    <div className="mt-2 p-2" style={{backgroundColor:"lightblue"}}>
                        <p>Copyright 2021 Andrew Lederman. This site is hosted at: <a href="#">Herokuapp.com  </a>Github: <a href="https://github.com/Andrewgl22/DevSite" target="_blank" rel="noreferrer">  Github</a></p> 
                    </div>
                </Col>
            </Row>
        </Container>    
    )
}

export default Dashboard;