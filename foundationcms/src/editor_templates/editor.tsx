import React, { useState, useEffect } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';

import Menu from './Menu';

import mobile_icon from '../assets/mobile_icon.png'
import monitor_icon from '../assets/monitor_icon.png'
import ToggleSwitch from './toggleSwitch';
import TemplateList from './templateList';

const Editor: React.FC = () => {

  const [slider, setSlider] = useState<number>(968);
  const [user,setUser] = useState<string>();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const navigate = useNavigate();
  const [userPermission,setUserPermission] = useState('');
  const[templateid, setTemplateid] = useState<any>()

  useEffect(()=>{
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/session", {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
  
        if(data.authenticated){
          navigate(`/editor?userId=${data.userId}`);
        }else{
          console.log("user is not authenticated");
        }
      } catch (error) {
        console.log("Error checking session:", error);
      }
    };
    checkSession();
   },[])
    
  useEffect(()=>{
    const fetchUser =async()=>{
      //const csrfToken = await getCsrfToken();
      // console.log("userId:", userId);
    const response = await fetch('http://localhost:8080/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify({userId}),
    });
  
    const data = await response.json();
    console.log(data);
    const email = data.email
    const permission = data.permission
    setUser(email)
    setUserPermission(permission)
    } 
    fetchUser();
  },[userId])
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlider(Number(e.target.value));
  };
  useEffect(()=>{
    if(userPermission=='admin'){
      sessionStorage.setItem('permissionToken', userPermission);
    }
    else{
      sessionStorage.removeItem('permissionToken');
    }

  },[userPermission])
  
  if(userId != null){
    sessionStorage.setItem('idToken',userId)
  }

  return (
    <>
      <div className='flex w-screen h-screen'>
        <div className='w-[40%] flex flex-col'>
          <div className='bg-black flex p-[14px] items-center justify-between overflow-scroll'>
            <div className='flex ml-[24px]'>
              <div className='text-white font-itcfranklinbold text-[48px] leading-[48px] uppercase mr-[16px] '>{userPermission}</div>
              <div className='font-itcfranklinnormal text-white text-[18px] mr-[24px] self-center mr-[16px]' >{user}</div>
            </div>
            <div className='mr-[32px]'><Menu permission={userPermission} /></div>
          </div>
          
       
          {/*<div className='flex-1 overflow-y-scroll'><Inputs permission={userPermission} /></div>*/}
          
          <div className='flex mt-[32px] ml-[32px] h-[85%]'>
          <div className='w-[35%] '><TemplateList selectedTemplate={(id:any)=>{setTemplateid(id)}}/></div>
          <div className='w-[65%] '><ToggleSwitch usPermission={userPermission} templateId={templateid} /></div>
          </div>
      
        </div>
        <div className='w-[60%] flex flex-col'>
          <div className='bg-black flex max-w-[968px] p-[14px]'>
            <p className='uppercase  font-itcfranklinbold text-white text-[48px] leading-[48px] ml-[24px]'>Preview</p>
            <div className='self-center justify-center w-[100%] flex'>
              <div className='flex mr-[10px] gap-2'>
                <button onClick={() => setSlider(525)}><img className='w-[30px] h-[30px]' src={mobile_icon} alt="" /></button>
                <button onClick={() => setSlider(968)}><img className='w-[30px] h-[30px]' src={monitor_icon} alt="" /></button>
              </div>
              <input
                className=' '
                type="range"
                min='525'
                max='968'
                value={slider}
                onChange={handleSliderChange}
              />
              <span className='ml-[16px] text-white '>{slider}px</span>
            </div>
          </div>
          <iframe src='http://localhost:3030/' className='shadow-2xl justify-self-stretch h-[100%] boreder-[#ECECEC] border-l-[1px] border-r-[1px]' width={slider}></iframe>
        </div>
      </div>


    </>
  );
};

export default Editor;


