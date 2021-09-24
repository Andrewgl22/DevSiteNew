import React, {useState, useEffect, useContext} from 'react';
import {IconContext} from './IconProvider';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import { io } from 'socket.io-client';
import dateformat from 'dateformat';
import Header from './Header';
import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap';

const socket = io('http://localhost:8000')

const ChatRoom = () => {
    //this is the receiving user id coming from the url when you click on the message in the inbox
    const {id} = useParams();

    const [user2,setUser2] = useState({})

    const [messages, setMessages] = useState([]);

    const [newMsg, setNewMsg] = useState("");

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    //requests the Chat document between these 2 users from db and stores them in messages
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/messages/` + loggedUser1._id + '/' + id) 
        .then((res)=>{
            console.log(res.data[0]["conversation"])
            setMessages(res.data[0]["conversation"])
        })
        .catch((err)=>console.log(err))
    },[])

    const [socket] = useState(()=>io(':8000'))

    //grabs the 2nd user document and stores in state
    useEffect(()=>{
        axios.get('http://localhost:8000/api/dev/' + id)
        .then((res)=>{
            setUser2(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    useEffect(() => {
      // we need to set up all of our event listeners
      // in the useEffect callback function
        socket.on('Welcome', data => console.log(data));

      // note that we're returning a callback function
      // this ensures that the underlying socket will be closed if App is unmounted
      // this would be more critical if we were creating the socket in a subcomponent
        return () => socket.disconnect(true);
    }, []);

    useEffect(()=>{
        socket.on("message", (msg) =>
            setMessages(prevMessages => {
                return [...prevMessages, msg]
            })
    )},[])

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit('clientEvent', {from:loggedUser1._id, to:id, name1:loggedUser1.name, name2:user2.name, msg:newMsg, time:dateformat(new Date(), "dddd, h:MM TT" )})
        e.target.reset();    
    }


    return(
        <Container fluid className="App m-0 p-0 bg-warning mx-0">
            <Header />
            <Row nogutter className="h-100">
            <Col className="">
            <h1>Send a message to {user2.name}</h1>
                <form onSubmit={submitHandler}>
                <input type='textarea' onChange={(e)=>setNewMsg(e.target.value)} /><br></br>
                <input type='submit' className="mt-3"/>
                </form>
            <Row className="align-items-center justify-content-center">
                
                <Col className="col-6 col-md-6 col-xs-12 overlow-auto offset-2">
                    { messages ? messages.map((message,idx)=>(
                        
                        <p key={idx} className='message justify-content-start align-items-left p-1'><img src="http://localhost:8000/images/aeaf6051401d7ba03d6e145474d1b21d" alt="" className="avatar avatar-sm rounded-circle mr-2 ml-0" style={{height:"35px",width:"35px"}}  /><span><b>{loggedUser1.name}</b><i>{dateformat(message.createdAt, "dddd, h:MM TT") }</i><br></br>{message.message}</span></p>
                    )) : null}
                </Col>
            </Row>
        </Col>
            </Row>
        </Container>

    )
}

export default ChatRoom;