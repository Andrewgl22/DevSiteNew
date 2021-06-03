import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link} from 'react-router-dom';
import { io } from 'socket.io-client';
import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap';

const socket = io('http://localhost:8000')

const ChatRoom = () => {

    const [user, setUser] = useState({})
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/dev/${id}`)
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>console.log(err))
    })

    useEffect(()=>{
        // if conversation with userId and urlID already exists:
            // pull conversation from database and store in state   
    })

    // message post handler:
        // if conversation with userID and urlId doesn't exist:
            // create new conversation and store a copy in both users in database
            // open socket/room for both
        // else if it exists: 
            // open socket and post message to the conversation array.


    // return(
    //     <Container>
            
    //             <h1>Send a message to {user.name}</h1>
    //             <form>
    //                 <textarea>Add your message here...</textarea><br></br>
    //                 <Button>Post</Button>
    //             </form>


    //     </Container>
    // )

    const [socket] = useState(()=>io(':8000'))

    const [messages, setMessages] = useState([]);

    const [newMsg, setNewMsg] = useState("");

    useEffect(() => {
      // we need to set up all of our event listeners
      // in the useEffect callback function
      console.log('Is this running?');
      socket.on('Welcome', data => console.log(data));
   
      // note that we're returning a callback function
      // this ensures that the underlying socket will be closed if App is unmounted
      // this would be more critical if we were creating the socket in a subcomponent
      return () => socket.disconnect(true);
    }, []);

    useEffect(()=>{
        socket.on("message", msg =>
            setMessages(prevMessages => {
                return [...prevMessages, msg]
            })
        )
    },[])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(newMsg)
        socket.emit('clientEvent', newMsg)
        console.log(messages)
        e.target.reset();
        
    }


    return(
        <Container className="App">
            <h1>Send a message to {user.name}</h1>
            <Link to="/dashboard">Dashboard</Link>
                <form onSubmit={submitHandler}>
                <input type='textarea' onChange={(e)=>setNewMsg(e.target.value)} /><br></br>
                <input type='submit' className="mt-3"/>
                </form>
           
            <div className="app">
                {messages.map((message,idx)=>(
                    <p key={idx} className='message'><span>{message}</span></p>
                ))}
            </div>
        </Container>

    )
}

export default ChatRoom;