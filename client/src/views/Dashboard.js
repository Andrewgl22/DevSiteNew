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

    return(
        <Container fluid>
            <Row>
                <Header/>
            </Row>
            <div>
              
                <h1>Welcome!</h1>
            </div>
            {/* <Link to="/addJob" className="job-button">Add new Job</Link> */}
          
                <div>
                    <CodeNews />
                    <DevList/> 
                    <JobList />
                </div>
                <div className="mt-2" style={{backgroundColor:"cyan"}}>
                    <p>Copyright 2021 Andrew Lederman. This site is hosted at:</p>
                </div>
        </Container>    
    )
}

export default Dashboard;