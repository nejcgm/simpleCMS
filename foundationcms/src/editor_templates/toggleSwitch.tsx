import React from 'react'
import { useState , useRef, useEffect} from 'react'
import Move from './move';
import Inputs from './inputs';

interface forToggle {
    usPermission:any
    templateId:number
}

const ToggleSwitch: React.FC<forToggle> = ({usPermission, templateId}) => {
const [content,setContent] = useState(true)
const [move,setMove] = useState<boolean>()
const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

//console.log(templateId)
  return (
    <div className='px-[32px]'>
        <div className='flex gap-2 mb-[24px]'>
        <button 
        ref={buttonRef}
        className='
        outline-none
         w-[100px] py-1 
         border-[1px] border-[#C8CBCC]
         bg-white hover:bg-[#F5F5F5] 
        focus:bg-[#EBEBEB] focus:border-black
         transition-all'
         onClick={()=>{setContent(true)}}>Edit
         </button>

        <button
        className='
         w-[100px] py-1 
         border-[1px] border-[#C8CBCC] 
         bg-white hover:bg-[#F5F5F5] 
        focus:bg-[#EBEBEB] focus:border-black
         transition-all'
        onClick={()=>{setMove(true); setContent(false)}}>Move</button>
        </div>
        <div>
        {content == true ? 
        
        (<div className=''><Inputs permission={usPermission} templateid={templateId} /></div>) 
        :
        (<>
        <Move/>
          <button className='p-[6px] w-[80px] bg-black mt-[10px] pt-[10px] rounded-md text-white uppercase font-itcfranklinbold'
        onClick={()=>{window.location.reload()}}>Save
       </button>
       </>)
        }
        </div>

    </div>
  )
}

export default ToggleSwitch