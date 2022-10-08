import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { io } from 'socket.io-client';
import dateformat from 'dateformat';
// import Header from './Header';
import {
    Row,
    Col,
} from 'react-bootstrap';
import {IconContext} from './IconProvider';

// const socket = io('http://localhost:8000')

const ChatRoom = () => {
    //this is the receiving user id coming from the url when you click on the message in the inbox
    const {id} = useParams();

    // const [id2,setId2] = useState(id)

    const {msgUpdate} = useContext(IconContext);

    const [msgToggle, setMsgToggle] = msgUpdate;

    const [user2,setUser2] = useState({})

    const [messages, setMessages] = useState([]);

    const [newMsg, setNewMsg] = useState("");

    const [socket] = useState(()=>io('http://localhost:8000'))

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    //grabs the 2nd user document using id from URL and stores in state
    useEffect(()=>{
        axios.get('http://localhost:8000/api/dev/' + id)
        .then((res)=>{
            setUser2(res.data)
        })
        .catch((err)=>console.log(err))
    },[id])

    //requests the Chat document between these 2 users from db and stores them in messages
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/chats/messages/` + loggedUser1._id + '/' + user2._id) 
        .then((req)=>{
            // console.log(req.data)
            setMessages(req.data[0].conversation)
        })
        .catch((err)=>console.log(err))
    // },[messages])    <== if we set the messages, it will update the state and cause an infinite loop
    },[messages, user2._id])

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
    }, [socket]);

    // change unread flag for all messages to loggedUser1
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/chats/update/` + loggedUser1._id + '/' + user2._id)
        .then((res)=>{
            setMsgToggle(!msgToggle)
            console.log("messages updated and flag is now: " + msgToggle)
        }).catch((err)=>{
            console.log(err)
        })
        // passing in state as dependency that is
        // being used in this useEffect will create
        // an infinite loop just like I saw (messages)
    },[])

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
    <>      
        <Row className="mt-5 p-0 mx-0 no-gutters">
            <Col className="text-center mt-4 d-block col-12 col-sm-6 mx-auto d-block overflow-auto">
                { user2.name !== null ? <h1>Send a message to {user2.name}</h1>: null}
                    <form onSubmit={submitHandler} className="mb-3">
                        <input type='textarea' onChange={(e)=>setNewMsg(e.target.value)} /><br></br>
                        <input type='submit' className="mt-3"/>
                    </form>
            </Col>
        </Row>
        <Row className="my-height justify-content-center no-gutters">
            <Col className="text-center overflow-auto col-11 col-sm-3 mx-auto ml-4">
                { messages ? messages.map((message,idx)=>(
                    // {message.from == user2._id ? "margin-left:30px" : null}
                    <p key={idx} style={message.from === user2._id ? {marginLeft:'20vh'} : {marginLeft:
                    '2vh'}} className='message p-1'><img src={"http://localhost:8000/api/images/" + message.key} alt="" className="avatar avatar-sm rounded-circle mr-4" style={{height:"35px",width:"35px"}}  /><span className=""><b>{message.from === loggedUser1._id ? loggedUser1.name : user2.name}</b><br></br><i style={{fontSize:'10px'}}>{dateformat(message.createdAt, "dddd, h:MM TT") }</i></span><br></br>{ message ? message.message : ""}</p>
                )) : null}
            </Col>
        </Row>

    </>
    )
}

export default ChatRoom;