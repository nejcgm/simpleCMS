import React, { useEffect, useState } from 'react';
import useImages, { fetchTemplates, Template } from '../functions/functions';

const AboutProgram = () => {
const [templates, setTemplates] = useState<Template[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(26);

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
    <div key={index} className='md:flex mt-[64px]'>
        <div className=' md:w-[50%]'>
            <h1 className='uppercase font-itcfranklinbold tracking-[2px] text-[30px] text-[#121212]'>{template.content[0]?.content}</h1>
            <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[1]?.content}</p>
            {templateImages ? (
            <img className='mt-[32px]' src={templateImages[0]} alt="" />
        ) : (
            <p>Image not found</p>
          )}
        </div>
        <div className='md:ml-[32px] mt-[24px] md:mt-[0px] md:w-[50%]'>
        <h1 className='uppercase font-itcfranklinbold tracking-[2px] text-[30px] text-[#121212]'>{template.content[2]?.content}</h1>
        <p className='font-dentonlight font-bold text-[16px] md:text-[20px] mt-[4px]'>{template.content[3]?.content}:</p>
        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212]'>{template.content[4]?.content}</p>

        <p className='font-dentonlight font-bold text-[16px] md:text-[20px] mt-[4px]'>{template.content[5]?.content}</p>
        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212]'>{template.content[6]?.content}</p>

        <p className='font-dentonlight font-bold text-[16px] md:text-[20px] mt-[4px]'>{template.content[7]?.content}</p>
        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212]'>{template.content[8]?.content}</p>

        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212] mt-[32px]'>{template.content[9]?.content}</p>

        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212] mt-[32px]'>{template.content[10]?.content}</p>

        <p className=' font-dentonlight text-[16px] md:text-[20px] text-[#121212] mt-[32px]'>{template.content[11]?.content}</p>
        </div>
    </div>
          ):(''))}
    </>
  )
}

export default AboutProgram