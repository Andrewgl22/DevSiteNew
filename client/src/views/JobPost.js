import React, {useState,useEffect, useContext} from 'react';
import axios from 'axios';
import {Link, useParams, useHistory} from 'react-router-dom';
import {IconContext} from '../components/IconProvider';
import {
    Container,
    Col,
    Row,
    Button,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import Header from '../components/Header'

const JobPost = (props) => {
    const [job, setJob] = useState({})
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const {id} = useParams()

    const {icons} = useContext(IconContext);
    const [enumObj] = icons;

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneJob/${id}`)
        .then((res)=>{
            setJob(res.data)
            console.log(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    // useEffect(()=>{
    //     setLoading(true)
    //     axios.get(`http://localhost:8000/api/getOneJob/` + id)
    //     .then((res)=>{
    //         setSkillsArr(res.data.skills)
    //     })
    //     .catch((err)=>console.log(err))
    // },[])

    // if(loading){
    //     return <p>Data is loading...</p>
    // }

    return(
        <Container fluid className="m-0 pt-3 p-0 bg-light pb-5">
            <Row>
                <Col className="col-md-12"></Col>
                {console.log(id)}
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="col-4">
                    <Col className="col">
                        <h1>{job.position}</h1>
                        <p>{job.company}</p>
                        { job.createdBy ? <p><b>Posted by {job.createdBy.name}</b></p> : null}
                        <div>
                            { job.skills ? job.skills.map((skill,idx)=>(
                                <>
                                    <OverlayTrigger
                                                        key={idx}
                                                        placement='bottom'
                                                        overlay={
                                                        <Tooltip className="show">
                                                            <strong>{skill}</strong>
                                                        </Tooltip>
                                                        }
                                                    >
                                    <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" className="mb-2 mr-1" value={`${skill}`}/>
                                    </OverlayTrigger>
                                </> 
                            )) : null}
                        </div> 
                        <p>{job.description}</p>
                        { job.createdBy && loggedUser1.type !== "employer" ? <Link to={"/chatroom/" + job.createdBy.id}><Button className="app" style={{marginTop:"20px"}}>Apply for this position</Button></Link> : null}
                    </Col>
                </Col>
            </Row>
            
        </Container>

    )
}

export default JobPost;