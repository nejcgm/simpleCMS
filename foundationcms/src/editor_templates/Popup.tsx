import React, { useState, useEffect } from 'react'

interface forPopup{
    callPopup:boolean
    message:string
}

const Popup:React.FC<forPopup> = ({callPopup,message}) => {
const [ok,setOk]=useState<boolean | null>(false)

useEffect(() => {
    setOk(callPopup);
  }, [callPopup]);

    const handleOk=()=>{
        setOk(false)
    }
  return (
    <div className={`${ok ? 'flex' : 'hidden'} flex-col fixed w-full h-full bg-neutral-950/[.2] justify-center items-center z-50`}>
        <div className='w-[512px] bg-white'>
            <div className='flex justify-center items-center bg-[#D64C47] text-white font-itcfranklinbold text-[18px] uppercase tracking-[2px] pt-[8px] pb-[4px] '>error</div>
            <div className='pl-[24px] pr-[24px] pt-[24px] pb-[24px]'>
                <div className='font-itcfranklinnormal tracking-[1px]'>{message}. Make sure you entered the correct credentials.</div>
                <div className='w-full flex justify-end'>
                    <button onClick={handleOk} className='mt-[24px] bg-[#D64C47] text-white font-itcfranklinnormal text-[14px] uppercase tracking-[2px] pt-[8px] pb-[8px] pr-[48px] pl-[48px]'>ok</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Popup