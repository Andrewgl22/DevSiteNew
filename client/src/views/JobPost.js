import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {IconContext} from '../components/IconProvider';
import {
    Container,
    Col,
    Row,
    Button
} from 'react-bootstrap';
import Header from '../components/Header'

const JobPost = (props) => {
    const [job, setJob] = useState({})

    const {id} = useParams()

    const {icons} = useContext(IconContext)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneJob/` + id)
        .then((res)=>{
            console.log("grabbing the job")
            console.log(res.data.createdBy.id)
            setJob(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    // const submitApplication = () => {
        
    // }

    return(
        <Container fluid className="m-0 p-0">
            <Row>
                <Col className="col-md-12"></Col>
                <Header />
            </Row>
            <Row className="bg-light d-flex justify-content-center align-items-center">
                <Col className="col-4">
                    <Col className="col">
                        <h1>{job.position}</h1>
                        {console.log("returning the list")}
                        {/* <p>Required skills: 
                            {job.skills.map((icon,idx) => (
                                <img src={icons.icon} alt="" height="40" width="40" value="css" />
                            ))
                            }</p> */}
                        <p>{job.description}</p>
                        <Link to={"/chatroom/" + job.createdBy}><Button className="app" style={{marginTop:"20px"}}>Apply for this position</Button></Link>
                    </Col>
                </Col>
            </Row>
            
        </Container>

    )
}

export default JobPost;