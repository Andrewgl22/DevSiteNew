import React from 'react';
// import Header from './components/Header';
import JobForm from './components/JobForm';
import Dashboard from './views/Dashboard';
import DevSignUp from './views/DevSignUp';
import JobPost from './views/JobPost';
import Login from './components/Login';
import Register from './components/Register';
import DevInfo from './views/DevInfo'
import Messages from './components/Messages';
import ChatRoom from './components/ChatRoom';
import './App.css';
import { Container } from 'react-bootstrap';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import 'bootstrap/dist/css/bootstrap.min.css';

// importing context

import {IconProvider} from './components/IconProvider';

const history = createBrowserHistory()

function App() {

  return (
    <IconProvider>
    <Container fluid className="App" style={{marginLeft:"0px",marginRight:"0px"}}>
      <Router history={history}>
          <Switch>
            <Route path="/" exact component={DevSignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/addJob" component={JobForm} />
            <Route path="/jobpost/:id" exact component={JobPost} />
            <Route path="/devinfo/:id" exact component={DevInfo} />
            <Route path="/messages/:id" exact component={Messages} />
            <Route path="/chatroom/:id" exact component={ChatRoom} />
          </Switch>
        </Router>
      
  
    </Container>
    </IconProvider>
  );
}

export default App;

// reach-router routing set-up

{/* <Header />
<Router>
  <DevSignUp path="/*"/>
  <Dashboard path='/dashboard/*'/>
  <JobForm path='/addJob' />
  <JobPost path='/jobpost/:id'/>
</Router> */}