import React, { useEffect, useState } from 'react';
import useImages, { fetchTemplates, Template } from '../functions/functions';

const Future_funding = () => {
const [templates, setTemplates] = useState<Template[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(28);

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
    <div key={index} className='mt-[100px] md:flex mb-[200px]'>
        <div className=' md:w-[50%]'>

        <h1 className='text-[30px] leading-[24px] md:text-[60px] md:leading-[50px]  xl:text-[100px] xl:leading-[80px] uppercase font-itcfranklinbold '>
        {template.content[0]?.content}</h1>

        {templateImages ? (
            <img className='flex md:hidden mt-[32px]' src={templateImages[0]} alt="" />
        ) : (
            <p>Image not found</p>
          )}
            <p className=' md:w-[70%] mt-[32px] font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>
            {template.content[1]?.content}</p>
        </div>
        {templateImages ? (
        <img className='md:flex hidden md:w-[50%]' src={templateImages[0]} alt="" />
    ) : (
            <p>Image not found</p>
          )}
    </div>
          ):(''))}    
    </>
  )
}

export default Future_funding