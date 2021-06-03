import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {IconContext} from './IconProvider';
import {Carousel, Container, Col, Row, Button} from 'react-bootstrap';


const DevList = (props) => {
    const [devList,setDevList] = useState([])

    const {icons} = useContext(IconContext);
    const [enumObj] = icons;

    const history = useHistory();


    useEffect(()=>{
        axios.get('http://localhost:8000/api/devs')
        .then((res)=>{
            setDevList(res.data)
        })
        .catch((err)=>console.log(err))
    },[]);
    
    return(
        <div className="dev-form col-4" fluid="xs">
            <h4>Featured Devs</h4>
            <Carousel className="mt-3 col-sm-12 col-xs-12">
                {devList.map((dev,idx)=>(
                    dev.type === 'dev' ?
                    // <div key={idx} className="pic-box">
                        <Carousel.Item key={idx} className="pic-box2">
                            <img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="profile-photo" />
                            <h2>{dev.name}</h2>
                            <h6>{dev.stackType}</h6>
                            <Row className="h-2">
                                <Col className="">
                                    <div className="" >
                                        {dev.skills.map((skill,idx)=>(
                                            <>
                                                <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" value={`${enumObj[skill]}`} />
                                            </>
                                        ))}   
                                    </div>
                                </Col>
                            </Row>
                            <button className="mt-2" style={{borderRadius:"15px"}} onClick={(e)=>history.push(`/devinfo/${dev._id}`)}>View Profile</button>
                        </Carousel.Item>
                    /* </div> */
                    :
                    undefined    
                ))}
            </Carousel>
            
        </div>
    )
}

export default DevList;