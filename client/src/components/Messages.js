import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const Messages = () => {

    const [messages, setMessages] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8000/messages/:userId')
        .then((res)=>{
            setMessages(res)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    return(
        <Container>
            <Header />
            <Row>
                {!messages ? <p>You have 0 messages</p> : 
                messages.map((message,idx)=>(
                    <div>
                        <p>hello</p>
                    </div>
                ))
                }
            </Row>
        </Container>
        
    )
}

export default Messages;