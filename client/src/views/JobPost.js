import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {
    Container,
    Col,
    Row,
    Button
} from 'react-bootstrap';
import DevList from '../components/DevList';
import Header from '../components/Header'

const JobPost = (props) => {
    const [job, setJob] = useState({})

    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/dev/${id}`)
        .then((res)=>{
            setJob(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    const submitApplication = () => {
        
    }

    return(
        
       
        <Container>
            <Col className="col-md-12"></Col>
            <Header />
            <div className="job-info">
                <h1>{job.name}</h1>
                <p>Required skills:</p>
                <p>{job.bio}</p>
                <Button className="app" style={{marginTop:"20px"}}>Apply for this position</Button>
            </div>
            
        </Container>

    )
}

export default JobPost;