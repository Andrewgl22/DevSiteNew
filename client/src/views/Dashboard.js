import React from 'react';
// import {Link} from 'react-router-dom';
import DevList from '../components/DevList';
import JobList from '../components/JobList';
import CodeNews from '../components/CodeNews';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';

const Dashboard = (props) => {
    // console.log(props)

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    return(
        <Container fluid className="App col-12 no-gutters pb-5 p-5-sm mt-3">
            {/* <Header nogutter /> */}
            <Row className="d-flex justify-content-center mt-5 p-4 text-center">
                    <h1>Welcome {loggedUser1.name}!</h1>
            </Row>
            <Row>
                    <DevList/>
                    <JobList />
                    <CodeNews />
                    
            </Row>
            <Row className="pt-5">
                <Col className="g-0" style={{backgroundColor:"lightblue"}}>
                        <p className="p-2 g-0">Copyright 2022 Andrew Lederman. This site is hosted on AWS and <a href="https://github.com/Andrewgl22/DevSiteNew" target="_blank" rel="noreferrer">  Github</a></p> 
                </Col>
            </Row>
        </Container>    
    )
}

export default Dashboard;