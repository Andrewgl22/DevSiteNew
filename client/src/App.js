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
import {MainLayout} from './components/layout/MainLayout'
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import './index.css'
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// importing context

import {IconProvider} from './components/IconProvider';

function App() {

  const localUser = localStorage.getItem('loggedUser')
  const loggedUser1 = JSON.parse(localUser)

  return (
    <IconProvider>
        {/* <Header /> */}
      <BrowserRouter>
          <Routes>
            {/* Log/Reg */}
            <Route path="/" element={<Register/>}  />
            <Route path="/login" element={<Login/>}  />
            <Route path="/register" element={<Register/>}  />
            <Route path="/wizard" element={<DevSignUp/>}  />
            <Route path="/logout" element={<Login/>}  />
          
            <Route path="/" element={<ProtectedRoute />}>
              <Route element={<MainLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}  />
                <Route path="/addJob" element={<JobForm/>}  />
                <Route path="/jobpost/:id" element={<JobPost/>}  />
                <Route path="/devinfo/:id" element={<DevInfo/>}  />
                <Route path="/messages/:id" element={<Messages/>}  />
                <Route path="/chatroom/:id" element={<ChatRoom/>}  />
              </Route>
                
            </Route>
          </Routes>

        </BrowserRouter>
    </IconProvider>
  );
}

export default App;

