import logo from '../assets/arrow.png'
import involved_logo from '../assets/logo.png'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../editor_templates/Popup';
import getCsrfToken from '../functions/csrfAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requiedEmail, SetrequiedEmail]= useState<string | null>(null);
  const [requiedPassword, SetrequiedPassword]= useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const [emailBorder,SetEmailBorder]= useState<boolean | null>(null);
  const [passwordBorder,SetPasswordBorder]= useState<boolean | null>(null);
  const [popup,setPopup] = useState<boolean>(false)

  useEffect(()=>{
    if (isMounted.current) {
        if(email.length < 1){
          SetrequiedEmail('This Field is requred');
            SetEmailBorder(true);
        }
        else{
            SetrequiedEmail(null);
            SetEmailBorder(false);
        }
    }
    else{isMounted.current = true;}

   },[email])

   useEffect(()=>{
    if (isMounted2.current) {
        if(password.length < 1){
          SetrequiedPassword('This Field is requred');
            SetPasswordBorder(true);
        }
        else{
            SetrequiedPassword(null);
            SetPasswordBorder(false);
        }
    }
    else{isMounted2.current = true;}

   },[password])

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
          return
        }
      } catch (error) {
        console.log("Error checking session:", error);
      }
    };
    checkSession();
   },[])

  const handleLogin=async()=>{
    
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        
      });
      setPopup(false);
      const data = await response.json();
      
      if (response.ok) {
        navigate(`/verify?userId=${data.userId}`);
      } else {
        console.log('nepravilno geslo')
        setError(data.message);
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to login');
    }
  
  };
  return (
    <>
    <div className=" flex h-screen place-content-center items-center">
    <div className=" w-[365px]">
        <div className='flex '>
    <span className="uppercase font-itcfranklinbold text-[48px] text-[#EC5B09] tracking-[2px]">sign</span>
    <span className="uppercase font-itcfranklinbold text-[48px] text-[#006C88] ml-[10px] tracking-[2px]">in</span>
    <span><img className='ml-[16px] mt-[8px] h-[48px] w-[48px]' src={involved_logo} alt="" /></span>
    </div>

    <form className="flex flex-col" action="" onSubmit={(e)=>e.preventDefault()}>
    <label className='font-itcfranklinnormal letter-[2px] text-[12px] font-medium uppercase mt-[5px] tracking-[2px]'>
        e-mail</label>
    <input className={`${emailBorder ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`} type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
    <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{requiedEmail}</div>
    <label className='font-itcfranklinnormal text-[12px] font-medium uppercase mt-[5px] tracking-[2px]'>
        password</label>
    <input className={`${passwordBorder ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{requiedPassword}</div>
    <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600'>{error}</div>
    <button onClick={handleLogin}  className="items-center mt-[24px] flex justify-between bg-black py-[12px] px-[8px]"><span className='text-white uppercase font-itcfranklinnormal tracking-[2px] text-[14px]'>log in</span><img className='w-[24px] h-[18px] bg-white' src={logo} alt="" /></button>
    </form>
    </div>
    <Popup callPopup={popup} message='Log in failed'/>
    </div>
    </>
  )
}

export default Login