import { useState , useEffect, useRef} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/arrow.png';
import Popup from '../editor_templates/Popup';


const Verify = () => {
    const [token, setToken] = useState('');
    const [, setError] = useState<string | null>(null);
    const [message, Setmessage]= useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const [newBorder,SetNewBorder]= useState<boolean | null>(null);
    const [popup,setPopup] = useState<boolean>(false)
   useEffect(()=>{
    if (isMounted.current) {
        if(token.length < 1){
            Setmessage('This Field is requred');
            SetNewBorder(true);
        }
        else{
            Setmessage(null);
            SetNewBorder(false);
        }
    }
    else{isMounted.current = true;}

   },[token])


    const handleVerify = async () => {
        try {
          
          const response = await fetch('http://localhost:8080/api/verify', {
            method: 'POST',
            credentials: "include", 
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ userId, token }),
          });
          
          setPopup(false)
          const data = await response.json();
          
          if (response.ok) {
            sessionStorage.setItem('authToken', token);
            navigate(`/editor?userId=${userId}`); 
          } else {
            setError(data.message);
            setPopup(true)
          }
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>
   
    <div className='flex items-center h-screen place-content-center'>
    <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col w-[365px]'>
      <div className='font-itcfranklinbold text-[48px] uppercase tracking-[2px]'>authentication</div>
      
      <label className='font-itcfranklinnormal letter-[2px] text-[12px] font-medium uppercase mt-[5px] tracking-[2px]'>
        authentication code</label>
      <input className={`${newBorder ? 'focus:border-red-600 border-red-600' : 'border-[#C8CBCC]' } appearance-none border-[1px] text-[14px] leading-[20px] p-[10px]  focus:outline-none focus:border-black text-[14px]`}
        type="text"
        required
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <div className='uppercase text-[14px] tracking-[1px] font-itcfranklinnormal text-red-600 '>{message}</div>
      <button className='items-center mt-[24px] flex justify-between bg-black py-[12px] px-[8px]' onClick={handleVerify}><span className='text-white uppercase font-itcfranklinnormal tracking-[2px] text-[14px]'>authenticate</span><img className='w-[24px] h-[18px] bg-white' src={logo} alt="" /></button>
      </div>
      </form>
      <Popup callPopup={popup} message='Verification failed'/>
    </div>
    </>
  );
};

export default Verify;
