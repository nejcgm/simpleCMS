import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

const Funding: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const templateImages = useImages(templates);
  
  
  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(9);
      
      setTemplates(templates);
      setLoading(false);
    };
  
    getTemplates();
  }, []);
  
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {templates.map(
        (template, index) =>
          template.is_visible ? (

    <div key={index} className='md:flex mt-[200px]'>
        
        {templateImages ? (
            <>
            <img className='md:flex hidden ml-[-30%] aspect-square w-[70%] h-[70%]  ' src={templateImages[0]} alt="" />
            <img className='flex md:hidden' src={templateImages[0]} alt="" />
            </>
            
        ) : (
            <p>Image not found</p>
          )}
        
        <div className=' md:ml-[32px]'>
            <div className='font-itcfranklinbold uppercase text-[#016C88] text-[32px] md:text-[100px] '>{template.content[1]?.content}</div>
            <div className='font-dentonlight text-[20px] mt-[48px] text-[#121212]'>
            {template.content[2]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[3]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[4]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[5]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[6]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[7]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[8]?.content}
            </div>
            <div className='font-dentonlight text-[16px] mt-[24px] text-[#121212]'>
            {template.content[9]?.content}
            </div>
            <div className='font-dentonlight text-[20px] mt-[24px] text-[#121212]'>
            {template.content[10]?.content}
            </div>

        </div>
    </div>
    ):('')
    )}
    </>
  )
}

export default Funding