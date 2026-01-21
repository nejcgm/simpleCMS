import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

const TheFoundation = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const templateImages = useImages(templates);

    useEffect(() => {
        const getTemplates = async () => {
          const templates = await fetchTemplates(8);
          
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
    <div key={index} className='mt-[64px]'>
        
            <div className='md:flex md:items-end justify-between block md:h-[500px]'>
            {templateImages ? (
                <>
                <img src={templateImages[0]} alt="aboutUsHead" className='md:hidden' />
                </>
            ) : (
                <p>Image not found</p>
              )}
                <h1 className='md:z-20 mt-[64px] text-[60px] uppercase font-itcfranklinbold md:text-[80px] lg:text-[120px] xl:text-[220px] leading-[50px] md:leading-[60px] lg:leading-[90px] xl:leading-[170px]'>
                    {template.content[1]?.content}
                    <br />
                    <span className='text-[#EDBB00]'>{template.content[2]?.content}</span>
                    <br />
                    {template.content[3]?.content}
                </h1>
                <div className='absolute ml-[-64px] flex w-full justify-end max-w-[1440px]'>
                {templateImages ? (
                <img src={templateImages[0]}  alt="aboutUsHead" className='hidden md:flex z-10' />
            ) : (
                <p>Image not found</p>
              )}
                </div>         
            </div>
            <div>
                <div className='font-dentonlight text-[20px] mt-[64px] text-[#121212]'>
                {template.content[4]?.content}
                </div>
                <div className='md:flex mt-[32px]'>
                    <div>
                        <div className='font-dentonlight text-[20px] text-[#121212]'>
                        {template.content[5]?.content}
                        </div>
                        <div className='mt-[32px] font-dentonlight text-[20px] text-[#121212]'>
                        {template.content[6]?.content}
                        </div>
                    </div>
                    <div className='md:ml-[24px] font-dentonlight text-[20px] text-[#121212]'>
                    {template.content[7]?.content}
                    </div>
                </div>
                <div className='mt-[32px] font-dentonlight text-[20px] text-[#121212]'>
                    {template.content[8]?.content} <a target="_blank" className='underline capitalize' href={template.content[9]?.content}>{template.content[10]?.content}</a> {template.content[11]?.content} <a target="_blank" className='underline capitalize' href={template.content[12]?.content}>{template.content[13]?.content}</a> {template.content[14]?.content}
                    </div>
            </div>
            
    </div>
      ):('')
    )}
    </>
  )
}

export default TheFoundation