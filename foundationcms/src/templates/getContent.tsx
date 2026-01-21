import React, { useEffect, useState } from 'react';
import useImages, { fetchTemplates, Template } from '../functions/functions';

const GetContent = () => {
const [templates, setTemplates] = useState<Template[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(27);

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
    <div key={index} className="md:w-[50%] md:mt-[64px] mt-[32px]">
        <div>
        <h1 className='uppercase font-itcfranklinbold tracking-[2px] text-[30px] text-[#121212]'>{template.content[0]?.content}</h1>
        <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'> {template.content[1]?.content} </p>

        <p className='mt-[32px] font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[2]?.content} </p>

        <p className='mt-[32px] underline font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[3]?.content} </p>
        <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[4]?.content}</p>

        <p className='mt-[32px] underline font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[5]?.content}</p>
        <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[6]?.content}<a className="underline" target='_blank' href={template.content[8]?.content}>{template.content[7]?.content}</a> {template.content[9]?.content} </p>

        <p className='mt-[32px] underline font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[10]?.content}</p>
        <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[11]?.content}</p>

        <p className='mt-[32px] underline font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[12]?.content}</p>
        <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[13]?.content}</p>
        </div>
    </div>
          ):('')
        )}
    </>
  )
}

export default GetContent