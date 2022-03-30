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

    const [chats, setChats] = useState([])

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/chats/messages/' + loggedUser1._id)
        .then((res)=>{
            setChats(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    const returnId = (chat) => {
        let result = chat.user_ids.filter(id => id !== loggedUser1._id);
        return result[0];
    }

    return(
        <Container fluid className="m-0 p-0">
            <Row className="align-items-center justify-content-center">
                <Table className="bordered table-striped col-6">
                    <th>
                        <p>Messages</p>
                    </th>
                    <tbody>
                    { !chats.length ? <tr><td>You have 0 messages</td></tr> : 
                        chats.map((chat,idx)=>(
                        <tr>
                            {/* {let chatid = chat.user_ids.filter(user => user.id !== loggedUser1.id)} */}
                            <td><Link to={`/chatroom/${returnId(chat)}`} style={{color:'lightgrey'}}><span style={{color:'black'}}>{chat.names[0] === loggedUser1.name ? chat.names[1] : chat.names[0]}</span><br></br>{chat.conversation[chat.conversation.length-1].message}</Link></td>
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