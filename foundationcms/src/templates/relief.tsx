import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const Relief: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(6);
      
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
      <div key={index} className="inline" id='relief'>
            
          <div  className="mr-[64px] md:w-[30%] md:mb-[-30%]">
              <p id="people-header" className="uppercase font-bold text-[50px] md:text-[120px] lg:text-[225px] mt-[48px] text-[#EC5B07] font-itcfranklinbold">{template.content[0]?.content}</p>
              <div className="mt-[32px]">
                  <p id="people-subheader1" className="uppercase font-bold tracking-[1px] text-[18px] leading-[32px] mb-[12px] md:text-[32px] font-itcfranklinbold">{template.content[1]?.content}</p>
                  <p id="people-content1" className="font-dentonlight text-[20px] weight-[300px]">
                  {template.content[2]?.content}
                  </p>
              </div>
          </div>
          <div className=" ">
          {templateImages ? (
            <>
                <img id="image-people" className="hidden md:flex  w-[100%]" src={templateImages[0]} alt="people-img" />
                <img id="image-people" className=" block md:hidden" src={templateImages[0]} alt="people-img "/>
                </>
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

export default Relief