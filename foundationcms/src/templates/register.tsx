import logo from '../assets/arrow.png'
import { useState,useEffect,useRef } from 'react'
import { useNavigate,Link, useSearchParams } from 'react-router-dom';



const Register = () => {
  const [email , SetEmail] = useState<string>('');
  const [password , SetPassword] = useState<string >('');
  const [password2, SetPassword2] = useState<string>('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, Setmessage]= useState<string | null>(null);
  const [scanMessage, SetScanMessage]= useState<string | null>(null);
  //for empty fields messages
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted3 = useRef(false);
  const [requiedEmail, SetrequiedEmail]= useState<string | null>(null);
  const [emailBorder,SetEmailBorder]= useState<boolean | null>(null);
  const [requiedPassword, SetrequiedPassword]= useState<string | null>(null);
  const [passwordBorder,SetPasswordBorder]= useState<boolean | null>(null);
  const [requiedPassword2, SetrequiedPassword2]= useState<string | null>(null);
  const [passwordBorder2,SetPasswordBorder2]= useState<boolean | null>(null);

  const [searchParams] = useSearchParams();
    const registerdUserId = searchParams.get('userId'); 
    const navigate = useNavigate();

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
    if (isMounted3.current) {
        if(password2.length < 1){
          SetrequiedPassword2('This Field is requred');
            SetPasswordBorder2(true);
        }
        else{
            SetrequiedPassword2(null);
            SetPasswordBorder2(false);
        }
    }
    else{isMounted3.current = true;}

   },[password2])

  const handleRegister = async()=>{
    if (password===password2 && email.length > 5 && password.length > 8 ){
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({ email : email , password: password }),
      });
      const data = await response.json();
      if (response.ok) {
        setQrCode(data.qrCode);
        setUserId(data.userId);
        Setmessage(data.message);
        SetScanMessage(data.scanMessage);
      }
    }
    else{
      Setmessage('passwords dont match or should be atleast 8 characters');
    } 
  }
  const handleCancel= ()=>{
    
    navigate(`/editor?userId=${registerdUserId}`)
  }

  return (
    <>
    <div className=" flex h-screen place-content-center items-center">
    <div className=" w-[365px]">
    <span className="uppercase font-itcfranklinbold text-[48px] text-[#EDBB00]">register </span>
    <span className="uppercase font-itcfranklinbold text-[48px] text-[#006C88]">an </span>
    <span className="uppercase font-itcfranklinbold text-[48px] text-[#EC5B09]">account</span>

    <form className="flex flex-col" action="" onSubmit={(e) => e.preventDefault()}>
      {/*{email.length < 1 && (<div>enter email</div> )  }*/}
      <label className='font-itcfranklinnormal text-[12px] font-medium uppercase mt-[5px] tracking-[2px]' >
          e-mail</label>
      <input className={`${emailBorder ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`} type="email" value={email}onChange={(e)=>SetEmail(e.target.value)}required />
      <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{requiedEmail}</div>
      <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600'>{message}</div>
      <label className='font-itcfranklinnormal text-[12px] font-medium uppercase mt-[5px] tracking-[2px]'>
          password</label>
      <input className={`${passwordBorder ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`} type="password" value={password}onChange={(e)=>SetPassword(e.target.value)} required  />
      <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{requiedPassword}</div>
      <label className='font-itcfranklinnormal text-[12px] font-medium uppercase mt-[5px] tracking-[2px]'>
          repeat password</label>
      <input className={`${passwordBorder2 ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`} type="password" value={password2} onChange={(e)=>SetPassword2(e.target.value)} required />
      <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{requiedPassword2}</div>

      <button onClick={handleRegister} className="items-center mt-[24px] flex justify-between bg-black py-[12px] px-[8px]"><span className='text-white uppercase font-itcfranklinnormal tracking-[2px] text-[14px]'>register</span><img className='w-[24px] h-[18px] bg-white' src={logo} alt="" /></button>
    </form>
    <div className='flex flex-col items-center'>
      <div className='uppercase tracking-[1px] text-[16px] font-itcfranklinnormal text-red-600 mt-[10px]'>{scanMessage}</div>
        {qrCode  && <><img className='h-[200px] w-[200px]' src={qrCode} alt="QR Code for 2FA" />
        <button className='text-white uppercase font-itcfranklinnormal tracking-[2px] text-[12px] bg-black py-2 px-4'>
          <a href={qrCode} download={`${email}AUTH_QR.jpg`}>Download QR code</a>
          </button>
        </>}
        <button className='underline font-itcfranklinnormal text-[16px] tracking-[2px] mt-2 uppercase' onClick={handleCancel} >Cancel</button>
      </div>
    </div>
    </div>
    </>
  )
}

export default Register