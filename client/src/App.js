import React from 'react';
// import Header from './components/Header';
import JobForm from './components/JobForm';
import Dashboard from './views/Dashboard';
import DevSignUp from './views/DevSignUp';
import JobPost from './views/JobPost';
import Login from './components/Login';
import Header from './components/Header'
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
      <Router>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Router>
      <Router history={history}>
      <Header/>
          <Switch>
            {/* Index leads to register page now */}
            <Route path="/wizard" exact component={DevSignUp} />
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
    </IconProvider>
  );
}

export default App;

// reach-router routing set-up

