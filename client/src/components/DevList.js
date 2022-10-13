import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {IconContext} from './IconProvider';
import {Carousel, Col, Row, OverlayTrigger, Tooltip} from 'react-bootstrap';



const DevList = (props) => {

    // const localUser = localStorage.getItem('loggedUser')
    // const loggedUser1 = JSON.parse(localUser)

    const [devList,setDevList] = useState([])

    const {icons} = useContext(IconContext);
    const [enumObj] = icons;

    const navigate = useNavigate()


    useEffect(()=>{
        axios.get('http://localhost:8000/api/devs')
        .then((res)=>{
            setDevList(res.data)
        })
        .catch((err)=>console.log(err))
    },[]);
    
    return(           
            <Col className="align-items-center mx-auto order-sm-6 justify-content-center col-10 col-sm-4 mb-3">
                <h4>Featured Devs</h4>
                <Carousel className="mt-3">
                    {devList.map((dev,idx)=>(
                        // <div key={idx} className="pic-box">
                        dev.type === "dev" ?
                            <Carousel.Item key={dev._id} className="pic-box2 p-3">
                                <div className="d-flex">
                                    <img src={"http://localhost:8000/api/images/" + dev.imageKey} alt="" className="profile-photo" />
                                    <div className="ml-5">
                                        <h2>{dev.name}</h2>
                                        <h6>{dev.stackType}</h6>
                                    </div>
                                </div>
                                <Row className="mt-3 icons">
                                    <Col className="mt-1 mb-3 icons">
                                            <>
                                            {dev.skills.map((skill,idx)=>(
                                            
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
                                                        <img key={idx} src={enumObj[skill]} alt="" height="40px" width="40px" value={`${enumObj[skill]}`} />
                                                        </OverlayTrigger>
                                                    </>
                                            
                                            ))}  
                                            </> 
                                       

                                    </Col>
                                </Row>
                                <button className="mt-2" style={{borderRadius:"15px"}} onClick={(e)=>navigate(`/devinfo/${dev._id}`)}>View Profile</button>
                            </Carousel.Item>
                        /* </div> */   
                        : "")) }
                </Carousel>
                    </Col>
                    
    )
}

export default DevList;