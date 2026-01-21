import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

const ContactUs = () => {
const [templates, setTemplates] = useState<Template[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const templateImages = useImages(templates);

useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(24);
      
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
        <div key={index} id="getinvolved" className="mt-[100px] mx-[-24px]  grid aspect-square">
          {templateImages ? (
            <>
                <img id="image-getinvolved" className=" h-[500px] object-cover w-full md:h-full" src={templateImages[0]} alt="get-involved" />
                </>
                  ) : (
                <p>Image not found</p>
              )}
                <div className="bg-white self-auto w-full mt-[-230px] flex flex-col px-[32px] md:px-[64px] md:mb-[64px] pb-[64px]">
                    <div className="flex justify-center">
                    {templateImages ? (
                          <>
                        <img id="logo-getinvolved" className="flex mt-[-92px]" src={templateImages[1]} alt="get-logo" />
                        </>
                  ) : (
                <p>Image not found</p>
              )}
                    </div>
                   
                    <p className="self-center uppercase font-bold text-[48px] sm:text-[100px] sm:leading-[80px] mt-[32px] font-itcfranklinbold">{template.content[0]?.content} </p>
                    <p className="self-center font-dentonlight text-[20px] text-[#121212] text-center">{template.content[1]?.content} </p>
                    <p className="self-center font-dentonlight mt-[32px] text-[20px] text-[#121212]">{template.content[2]?.content} </p>
                    <a className='font-itcfranklinbold underline text-[32px] self-center' href={template.content[3]?.content}>{template.content[3]?.content}</a>
                    <p className="self-center font-dentonlight mt-[32px] text-[20px] text-[#121212] text-center">{template.content[4]?.content} </p>
                    <p className="self-center font-dentonlight mt-[32px] text-[20px] text-[#121212] text-center">{template.content[5]?.content} 
                    <span ><a className='font-dentonlight mt-[32px] text-[20px] text-[#121212] underline' href={template.content[7]?.content}>{template.content[6]?.content}</a></span>
                    <p className="self-center font-dentonlight mt-[32px] text-[20px] text-[#121212] text-center">{template.content[8]?.content} </p>
                    </p>
                </div>
            </div>
          ):(''))}
    </>
  )
}

export default ContactUs