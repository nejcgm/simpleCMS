import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Aboutus from './pages/Aboutus';
import GetInvolved from './pages/GetInvolved.tsx';
import JoinUs from './pages/JoinUs.tsx';
import Ourwork from './pages/OurWork.tsx';
import Mainlayout from './layouts/mainLayout.tsx';
import Editor from './editor_templates/editor.tsx';
import Register from './templates/register.tsx';
import Login from './templates/login.tsx';
import Verify from './templates/verify.tsx'
import ProtectedRoute from './templates/protectedRoute.tsx';
import UserSettings from './editor_templates/usersettings.tsx';
import ProtectedAdmin from './templates/protectedAdmin.tsx';
import MemberInfo from './templates/memberInfo.tsx';

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Mainlayout />}>
      <Route path="/" element={<Ourwork />} />
      <Route path="/about-us" element={<Aboutus />} />
      <Route path="/get-involved" element={<GetInvolved />} />
      <Route path="/join-us" element={<JoinUs />} />
      <Route path="/about-us/:id" element={<MemberInfo />} />
      </Route>
     

      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />

      <Route 
    path="/register" 
    element={
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    }/>

      <Route 
    path="/editor" 
    element={
      <ProtectedRoute>
        <Editor />
      </ProtectedRoute>
    }/>

  <Route 
    path="/usersettings" 
    element={
      <ProtectedAdmin>
        <UserSettings />
      </ProtectedAdmin>
  }/>
    
</Routes>

 </>
  
  );
};

export default App;
