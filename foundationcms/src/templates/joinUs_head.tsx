import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';
const JoinUs_head = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(29);

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
            <div key={index} className='md:flex md:mb-[200px]'>
              <div className='md:w-[50%]  mt-[64px]'>
                <h1 className='md:z-20 text-[60px] leading-[50px] uppercase font-itcfranklinbold md:text-[100px] md:leading-[90px] xl:text-[220px] xl:leading-[170px]'>
                  {template.content[0]?.content}
                </h1>

                <div className='md:hidden flex'>
                {templateImages ? (
                  <img src={templateImages[0]} alt="" />
                ) : (
                  <p>Image not found</p>
                )}
              </div>

                <p className='font-dentonlight text-[#121212] text-[16px] md:text-[20px]'>{template.content[1]?.content}</p>

                <p className='font-dentonlight mt-[32px] text-[#121212] text-[16px] md:text-[20px]'>{template.content[2]?.content}<a className="underline" target='_blank' href={template.content[3]?.content}>{template.content[4]?.content}</a></p>
                <Link target='_blank' id="join-team-cta" to={template.content[5]?.content}
                  className="uppercase font-bold text-[20px] mb-[32px] text-white self-center py-[8px] bg-black mt-[24px] font-itcfranklinbold flex justify-center md:w-[200px]">{template.content[6]?.content} </Link>
              </div>
              <div className='md:flex hidden md:w-[50%] md:h-[50%]'>
                {templateImages ? (
                  <img src={templateImages[0]} alt="" />
                ) : (
                  <p>Image not found</p>
                )}
              </div>
            </div>
          ) :('')
        )}
    </>
  )
}

export default JoinUs_head