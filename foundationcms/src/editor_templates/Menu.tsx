import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import React from 'react'
import cross from '../assets/cross.png'

interface forMenu{
    permission:string
}

const Menu:React.FC<forMenu>  = ({permission}) => {
    const [toggleMenu,setToggleMenu] = useState<boolean>(false)
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId'); 
    const navigate = useNavigate();
    const [userPermission,setUserPermission] = useState('');

    useEffect(()=>{
        setUserPermission(permission)
    },[permission])
    

    const handleMenu = () =>{
        setToggleMenu(prevToggleMenu => !prevToggleMenu);
    }

    const logOut = async () =>{
        try {
            const response = await fetch("http://localhost:8080/api/logout", {
              method: "POST",
              credentials: "include",
            });
        
            const data = await response.json();
            if (response.ok) {
              
              //Redirect to login page or update state
              sessionStorage.clear();
              localStorage.clear();
              
              window.location.reload();
            } else {
              console.log("Logout failed: " + data.message);
            }
          } catch (error) {
            console.error("Error logging out:", error);
          }
        //sessionStorage.clear();
        
      }
      const registerNew = ()=>{
        navigate(`/register?userId=${userId}`)
      }

      /*const userSettings = ()=>{
        navigate(`/usersettings?userId=${userId}`)
      }*/

  return (
    <>
    {toggleMenu != true ?(
        <button onClick={handleMenu} className='w-[32px] h-[32px] solid border-t-[2px] border-white flex flex-col'>
            <div className='h-[2px] w-[100%] bg-white my-[8px]'></div>
            <div className='h-[2px] w-[100%] bg-white'></div>
        </button>
    ):(
        <button onClick={handleMenu} className=""><img src={cross} alt="cross close" className="h-[32px] w-[32px] bg-white" /></button>
    )}

        {toggleMenu === true ?(
        <div className='absolute z-20 bg-[#EBEBEB] rounded-md ease-in-out shadow-lg transition-all mt-[6px]'>
            <ul>
                {userPermission == 'admin' ? (
                <>
                    <li className="rounded-md px-[16px] py-[5px] hover:bg-[#d3d3d3]"><Link to={`/usersettings?userId=${userId}`} className="font-itcfranklinnormal uppercase">User Settings</Link></li>
                    <li className="rounded-md px-[16px] py-[5px] hover:bg-[#d3d3d3]"><button onClick={registerNew} className="font-itcfranklinnormal uppercase"> register user</button></li>
                    <li className="rounded-md px-[16px] py-[5px] hover:bg-[#d3d3d3]"><button onClick={logOut} className="font-itcfranklinnormal uppercase">log out</button></li>
                </>
            ) : (
            <>
                <li className="rounded-md px-[16px] py-[5px] hover:bg-[#d3d3d3]"><button onClick={logOut} className="font-itcfranklinnormal uppercase">log out</button></li>
            </>
        )}
            </ul>
        </div>
        ): (
            <></>
        )}
    </>
  )
}

export default Menu