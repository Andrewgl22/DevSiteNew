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
import {MainLayout, LogRegLayout} from './components/layout/MainLayout';
import './App.css';
import {
  Route,
  Switch,
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
        {/* <Header /> */}
      <Router history={history}>
          <Switch>
            
            {/* Log/Reg */}
            <RouteWrapper path="/" exact component={Register} layout={LogRegLayout} />
            <RouteWrapper path="/login" exact component={Login} layout={LogRegLayout} />
            <RouteWrapper path="/register" exact component={Register} layout={LogRegLayout} />

            <RouteWrapper path="/wizard" exact component={DevSignUp} layout={LogRegLayout} />
            <RouteWrapper path="/logout" exact component={Login} layout={MainLayout} />
            <RouteWrapper path="/dashboard" exact component={Dashboard} layout={MainLayout} />
            <RouteWrapper path="/addJob" component={JobForm} layout={MainLayout} />
            <RouteWrapper path="/jobpost/:id" exact component={JobPost} layout={MainLayout} />
            <RouteWrapper path="/devinfo/:id" exact component={DevInfo} layout={MainLayout} />
            <RouteWrapper path="/messages/:id" exact component={Messages} layout={MainLayout} />
            <RouteWrapper path="/chatroom/:id" exact component={ChatRoom} layout={MainLayout} />
          
          </Switch>
        </Router>
    </IconProvider>
  );
}

function RouteWrapper({
  component: Component, 
  layout: Layout, 
  ...rest
}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

export default App;

// reach-router routing set-up

