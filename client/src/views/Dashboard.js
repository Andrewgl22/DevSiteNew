import React from 'react';
import {Link} from 'react-router-dom';
import DevList from '../components/DevList';
import JobList from '../components/JobList';
import Header from '../components/Header';
import CodeNews from '../components/CodeNews';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const Dashboard = (props) => {
    console.log(props)

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    return(
        <Container fluid className="App p-0">
            <Row className="align-items-center justify-content-center">
            </Row>
            <Row className="d-flex align-items-center justify-content-center mr-5">
                    <h1>Welcome {loggedUser1.name}!</h1>
            </Row>
            { loggedUser1.type === "employer" ? <Link to="/addJob" className="job-button">Add new Job</Link> : null}
            <Row>
                    <Col className="col-3 h-25 col-xs-0">
                    <CodeNews />
                    </Col>
                    <Col className="col col-4 col-xs-12">
                    <DevList/>
                    </Col> 
                    <Col className="col col-3 offset-1 col-xs-12">
                    <JobList />
                    </Col>
            </Row>
                <Row no gutters >
                    <Col className="p-0">
                    <div className="mt-2 p-3" style={{backgroundColor:"lightblue"}}>
                    <p>Copyright 2021 Andrew Lederman. This site is hosted at: <a href="#">Herokuapp.com</a></p>
                </div>
                    </Col>
                </Row>
        </Container>    
    )
}

export default Dashboard;