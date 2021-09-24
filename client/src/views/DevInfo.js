import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import Header from '../components/Header'
import {IconContext} from '../components/IconProvider'

const DevInfo = () => {

    const history = useHistory();
    const {id} = useParams();

    const [dev, setDev] = useState({})

    const {icons} = useContext(IconContext);
    const [enumObj, setEnumObj] = icons;

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

                <img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="profile-photo2" />
                    <h3>{dev.name}</h3>
                    {/* <div>
                    {dev.skills.map((skill,idx)=>(
                            <>
                                <img key={idx} src={enumObj[skill]} alt="" height="40" width="40" value={`${enumObj[skill]}`} />
                            </>
                        ))}  
                    </div>   */}
                   
                    <p>{dev.bio}</p>
                    <p><b>Website:</b> {dev.website}</p>
                    <p><b>Github:</b>{dev.github}</p>

                    <Button onClick={(e)=>history.push(`/chatroom/${dev._id}`)}>Message {dev.name}</Button>

               
                  
                </Col>
            </Row>
        </Container>
    )
}

export default DevInfo;