import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button,
    OverlayTrigger, 
    Tooltip
} from 'react-bootstrap';
import Header from '../components/Header'
import {IconContext} from '../components/IconProvider'


const DevInfo = () => {

    const history = useHistory();
    const {id} = useParams();

    const [dev, setDev] = useState({})

    const {icons} = useContext(IconContext);
    const [enumObj, setEnumObj] = icons;

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
    },[])

    return(
        <Container fluid>
            <Header />
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="col-4">  
                {dev.imageKey ?
                <img src={"http://localhost:8000/images/" + dev.imageKey} alt="" className="profile-photo2" /> :null}
                
                    <h3>{dev.name}</h3>
                    <div>

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
                    <p><b>Website:</b> {dev.website}</p>
                    <p><b>Github:</b>{dev.github}</p>

                    {loggedUser1._id != dev._id ? <Link to={"/chatroom/" + dev._id}><Button>Message {dev.name}</Button></Link> : null}
                
                </Col>
            </Row>
        </Container>
    )
}

export default DevInfo;