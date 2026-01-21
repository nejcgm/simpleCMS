import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

const JoinTheTeam = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const templateImages = useImages(templates);

    useEffect(() => {
        const getTemplates = async () => {
          const templates = await fetchTemplates(23);
          
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
            <div key={index} className='md:flex'>
                <div className='md:w-[40%]'>
                    <h1 className='mt-[64px] text-[60px] uppercase font-itcfranklinbold lg:text-[100px] leading-[50px] lg:leading-[80px]'>
                    {template.content[0]?.content}
                        <br />
                        <span className='text-[#EDBB00]'>{template.content[1]?.content}</span>
                        <br />
                        {template.content[2]?.content}
                    </h1>
                    {templateImages ? (
                    <img className='md:hidden' src={templateImages[0]} alt="" />
                ) : (
                    <p>Image not found</p>
                  )}

                    <p className='font-dentonlight text-[16px] md:text-[20px] mt-[32px] text-[#121212]'>
                         {template.content[3]?.content}
                    </p>

                    <p className='font-dentonlight text-[16px] mt-[32px] text-[#121212]'>
                    {template.content[4]?.content}
                    </p>
                    <Link target='_blank' id="join-team-cta" to={template.content[6]?.content}
                        className="uppercase font-bold text-[20px] mb-[32px] text-white self-center py-[8px] bg-black mt-[24px] font-itcfranklinbold flex justify-center md:w-[200px]">{template.content[5]?.content} </Link>
                </div >
                <div className='hidden md:flex w-[60%] h-[60%] mt-[64px] md:justify-end'>
                {templateImages ? (
                    <img src={templateImages[0]} alt="" />
                ) : (
                    <p>Image not found</p>
                  )}
                </div>
            </div>
             ):('')
            )}
        </>
    )
}

export default JoinTheTeam