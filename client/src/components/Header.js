import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    // Container,
    // Row,
    // Col,
    Navbar,
    Nav
} from 'react-bootstrap';
import axios from 'axios';
import {IconContext} from './IconProvider';

const Header = () => {
    const navigate = useNavigate()
    const {msgUpdate} = useContext(IconContext);

    const [msgToggle] = msgUpdate;

    const localUser = localStorage.getItem('loggedUser')
    const loggedUser1 = JSON.parse(localUser)

    // count of unread messages
    const [count, setCount] = useState([])
    const [test,setTest] = useState(false)

    const logoutHandler = () => {
        localStorage.clear()
        navigate('/login')
        // axios.get('http://localhost:8000/api/logout')
        // .then((res)=>{
        //     history.push('/login')
        // }).catch((err)=>console.log(err))
    }

    // This works, so msgToggle is being tracked properly
    useEffect(() => {
        console.log("Header Triggered")
        setTest(!test)
    },[msgToggle])

    //look through all chats that have this users ID, find all with unread messages,
    // and count those messages. Function should return the number of messages only.
    // Should be updatable immediately as more message get sent. In a useEffect.
    useEffect(()=>{
            axios.get('http://localhost:8000/api/chats/count/' + loggedUser1._id)
            .then((req)=>{
                console.log("counted messages in count useEffect is now " + req.data)
                setCount(req.data)
            }).catch((err)=>{
                console.log(err)
            })
    },[msgToggle])

    return(
                <Navbar className="bg-secondary bg-gradient fixed-top">
                    <Navbar.Brand><b>DevHyre</b></Navbar.Brand>
                    <Nav className="ml-auto d-flex align-items-center" >
                    <img src={"http://localhost:8000/api/images/" + loggedUser1.imageKey} alt="" className="avatar avatar-sm rounded-circle mr-2" style={{height:"2em",width:"2em"}}  />
                        <Link to="/dashboard" className="text-light m-1">Dashboard</Link>
                        {/* TODO ternary if count render if not null */}
                        <Link to="/messages/2" className="text-light m-1">Messages</Link>  
                        {/* {count !== null ? <span className="badge counter">{count}</span> : null }   */}
                        <Link to="" onClick={logoutHandler} className="ml-auto mr-2 text-light">Logout</Link>
                    </Nav>
                    {/* <Nav.Item>
                        <Link to='/dashboard' />
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/logout' />
                    </Nav.Item> */}
                </Navbar>
    )
}

export default Header;