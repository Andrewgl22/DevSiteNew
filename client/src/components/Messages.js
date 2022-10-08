import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Container,
    Row,
    Table,
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
        <Container fluid className="m-5 p-0">
            <Row className="align-items-center justify-content-center">
                <Table className="bordered table table-striped col-10 col-sm-6 mt-3 ">
                    <th>
                        <h2>Messages</h2>
                    </th>
                    <tbody>
                    { !chats.length ? <tr><td>You have 0 messages</td></tr> : 
                        chats.map((chat,idx)=>(
                        <tr key={idx}>
                            {/* {let chatid = chat.user_ids.filter(user => user.id !== loggedUser1.id)} */}
                            <td><Link to={`/chatroom/${returnId(chat)}`} style={{color:'black'}}><span style={{color:'black',fontWeight:"bold"}}>{chat.names[0] === loggedUser1.name ? chat.names[1] : chat.names[0]}</span><br></br>{chat.conversation[chat.conversation.length-1].message}</Link></td>
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