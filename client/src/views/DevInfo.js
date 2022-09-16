import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    OverlayTrigger, 
    Tooltip
} from 'react-bootstrap';
import {IconContext} from '../components/IconProvider'


const DevInfo = () => {

    const {id} = useParams();

    const [dev, setDev] = useState({})

    const {icons} = useContext(IconContext);
    const [enumObj] = icons;

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/dev/${id}`)
        .then((res)=>{
            setDev(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[id])

    return(
            <Row className="d-flex justify-content-center align-items-center mt-4">
                <Col className="col-10 col-sm-4 p-4 text-center"> 
                
                {dev.imageKey ?
                <img src={"http://localhost:8000/images/" + dev.imageKey} alt="" className="profile-photo2" /> :null}
                
                    <h3 className="text-align">{dev.name}</h3>
                    <div className="col-10 offset-1 text-center">

                    {dev.skills ? dev.skills.map((skill,idx)=>(
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
                                <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" value={`${enumObj[skill]}`} />
                                </OverlayTrigger>
                            </>
                        )) : null}  
                    </div>  
        
                    <p>{dev.bio}</p>
                    <p><b>Website: </b><a href={`${dev.website}`} target="_blank" rel="noreferrer" >{dev.website}</a></p> 
                    <p><b>Github: </b><a href={`${dev.github}`} target="_blank" rel="noreferrer" >{dev.github}</a></p>

                    {loggedUser1._id !== dev._id ? <Link to={"/chatroom/" + dev._id}><Button>Message {dev.name}</Button></Link> : null} 
                </Col>
            </Row>
    )
}

export default DevInfo;