import React, {useState, useEffect} from 'react';
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

// const socket = io('http://localhost:8000')

const ChatRoom = () => {
    //this is the receiving user id coming from the url when you click on the message in the inbox
    const {id} = useParams();

    const [id2,setId2] = useState(id)

    const [user2,setUser2] = useState({})

    const [messages, setMessages] = useState([]);

    const [newMsg, setNewMsg] = useState("");

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    //grabs the 2nd user document using id from URL and stores in state
    useEffect(()=>{
        axios.get('http://localhost:8000/api/dev/' + id)
        .then((res)=>{
            setUser2(res.data)
        })
        .catch((err)=>console.log(err))
    },[])

    // change unread flag for all messages to loggedUser1
    useEffect(()=> {
        for(let i=0;i<messages.length;i++){
            if(messages[i].unread == true && messages[i].from == user2._id ){
                messages[i].unread = false;
            }
        }
        axios.post('http://localhost:8000/api/chats/update',{messages})
    })

    //requests the Chat document between these 2 users from db and stores them in messages
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/chats/messages/` + loggedUser1._id + '/' + user2._id) 
        .then((res)=>{
            setMessages(res.data[0]["conversation"])
        })
        .catch((err)=>console.log(err))
    // },[messages])    <== if we set the messages, it will update the state and cause an infinite loop
    },[id, loggedUser1])

    const [socket] = useState(()=>io(':8000'))

    useEffect(() => {
        socket.on('Welcome', data => console.log(data));

        //when we receive message from socket server 
        //*(can all event listeners be in one use effect?)  <== YES!
        socket.on("message", (msg) =>
            setMessages(prevMessages => {
                return [...prevMessages, msg]
            })
        );

        return () => socket.disconnect(true);
    }, []);

    // function to update all messages to loggedInUser
    // to be unread:false
    // useEffect(()=>{
        
    /* 
        for(let i=0;i<messages.length;i++){
            if(messages[i].to == loggedInUser._id && unread == true){
                messages[i].unread = false
            }
        }
        axios.put()

    
    
    
    db.chats.aggregate([{$match:{user_ids:$all:{}}},{},{},{}])
    
    
    */

    

    // })

    //when we send message to socket server
    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit('clientEvent', {
            from:loggedUser1._id, 
            to:id, 
            key:loggedUser1.imageKey, 
            name1:loggedUser1.name, 
            name2:user2.name, 
            msg:newMsg, 
            unread:true, 
            time:dateformat(new Date(), "dddd, h:MM TT" )
        })
        e.target.reset();    
    }


    return(
        <Container fluid className="App m-0 p-0 bg-light mx-0">
            
            <Row nogutter className="h-100">
            <Col className="">
            { user2.name !== null ? <h1>Send a message to {user2.name}</h1>: null}
                <form onSubmit={submitHandler}>
                <input type='textarea' onChange={(e)=>setNewMsg(e.target.value)} /><br></br>
                <input type='submit' className="mt-3"/>
                </form>
            <Row className="align-items-center justify-content-center h-25">
                
                <Col className="col-6 col-md-6 col-xs-12 offset-3 chatbox overflow-auto">
                    { messages ? messages.map((message,idx)=>(
                        // {message.from == user2._id ? "margin-left:30px" : null}
                        <p key={idx} style={message.from === user2._id ? {marginLeft:'120px'} : {marginLeft:
                        '0px'}} className='message justify-content-start align-items-left p-1'><img src={"http://localhost:8000/images/" + message.key} alt="" className="avatar avatar-sm rounded-circle mr-4 ml-0" style={{height:"35px",width:"35px"}}  /><span className=""><b>{message.from == loggedUser1._id ? loggedUser1.name : user2.name}</b><br></br><i style={{fontSize:'10px'}}>{dateformat(message.createdAt, "dddd, h:MM TT") }</i></span><br></br>{ message ? message.message : ""}</p>
                    )) : null}
                </Col>
            </Row>
        </Col>
            </Row>
        </Container>

    )
}

export default ChatRoom;