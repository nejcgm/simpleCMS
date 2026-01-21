import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

const Mission: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);


useEffect(() => {
  const getTemplates = async () => {
    const templates = await fetchTemplates(2);
    
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
        
        <div key={index} className="inline">
          {templateImages ? (
            <>
            <img id="image-mission" className="hidden md:flex float-right  w-[50%] lg:mr-[-64px] aspect-square" src={templateImages[0]} alt="mission" />
          <img id="image-mission" className="md:hidden aspect-square" src={templateImages[0]} alt="mission" />
          </>
        ) : (
          <p>Image not found</p>
        )}
          <div className="">
              <p id="mission-header" className="uppercase font-bold text-[32px] md:text-[100px] my-[48px] font-itcfranklinbold">
                {template.content[0]?.content}
                </p>
              <p id="mission-content" className="md:w-[50%] font-dentonlight text-[20px]">
              {template.content[1]?.content}
              </p>
          </div>
        </div>
            ):('')
          )}
    </>
  )
}

export default Mission