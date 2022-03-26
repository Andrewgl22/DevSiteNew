import React, { useState, useEffect, useContext } from 'react';
import {IconContext} from './IconProvider';
import axios from 'axios';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Header from './Header'
import {
    Container,
    Row,
    Col,
    Button,
    Table,
    Thead,
    Tbody
} from 'react-bootstrap';
// import { getLoggedUser } from '../../../server/controllers/user.controllers';

const Messages = () => {

    const [messages, setMessages] = useState([])

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/chats/messages/' + loggedUser1.id)
        .then((res)=>{
            setMessages(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    return(
        <Container fluid className="m-0 p-0">
            <Row className="align-items-center justify-content-center">
                <Table className="bordered table-striped col-6">
                    <th>
                        <p>Messages</p>
                    </th>
                    <tbody>
                    { !messages.length ? <tr><td>You have 0 messages</td></tr> : 
                        messages.map((message,idx)=>(
                        <tr>
                            
                            <td><Link to={`/chatroom/${message.user_ids[0] === loggedUser1.id ? message.user_ids[1] : message.user_ids[0]}`} style={{color:'lightgrey'}}><span style={{color:'black'}}>{message.names[0] === loggedUser1.name ? message.names[1] : message.names[0]}</span><br></br>{message.conversation[message.conversation.length-1].message}</Link></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
                    
            </Row>
        </Container>
        
    )
}

export default Messages;