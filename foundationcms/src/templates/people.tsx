import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const People: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(4);
      
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
        <div key={index} className="inline" id='people'>
            <div className="">
            {templateImages ? (
                <>
                <img id="image-people" className="hidden md:flex flex-1 w-[50%] float-right" src={templateImages[0]} alt="people-img" />
                <img id="image-people" className=" md:hidden" src={templateImages[0]} alt="people-img "/>
                </>
            ) : (
                <p>Image not found</p>
              )}
            </div>
            <div  className="mr-[64px] lg:w-[50%]">
                <p id="people-header" className="uppercase font-bold text-[50px] md:text-[120px] lg:text-[225px] mt-[48px] text-[#EDBB00] font-itcfranklinbold">{template.content[0]?.content}</p>
                <div className="mt-[32px]">
                    <p id="people-subheader1" className="uppercase font-bold tracking-[1px] text-[18px] md:text-[32px] font-itcfranklinbold">{template.content[1]?.content}</p>
                    <p id="people-content1" className="font-dentonlight text-[20px] weight-[300px]">
                    {template.content[2]?.content}
                    </p>
                </div>
                <div className="mt-[32px]">
                    <p id="people-subheader2" className="uppercase font-bold tracking-[1px] text-[18px] md:text-[32px] font-itcfranklinbold">{template.content[3]?.content}</p>
                    <p id="people-content2" className="font-dentonlight text-[20px] weight-[300px]">
                    {template.content[4]?.content}
                    </p>
                </div>
                <div className="mt-[32px]">
                    <p id="people-subheader3" className="uppercase font-bold tracking-[1px] text-[18px] md:text-[32px] font-itcfranklinbold">{template.content[5]?.content}</p>
                    <p id="people-content3" className="font-dentonlight text-[20px] weight-[300px]">
                    {template.content[6]?.content}
                    </p>
                </div>
            </div>
        </div>
        ):('')
    )}
    </>
  )
}

export default People