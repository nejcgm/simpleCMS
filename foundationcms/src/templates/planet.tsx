import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const Planet: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(5);
      
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
        <div key={index} className="md:flex">
            <div className="md:w-[250%]">
            {templateImages ? (
                <>
                <img id="image-planet" className="hidden md:flex w-[100%] aspect-[4/3]  mt-[100px] mb-[64px] ml-[-64px] float-left" src={templateImages[0]} alt="people-img" />
                <img id="image-planet" className=" md:hidden " src={templateImages[0]} alt="people-img" />
                </>
                ) : (
                    <p>Image not found</p>
                  )}
            </div>
            <div id="planet" className="lg:w-[50%] ">
                <p id="planet-header" className="uppercase font-bold text-[50px] md:text-[120px] lg:text-[225px] mt-[48px] text-[#016C88]  font-itcfranklinbold ">{template.content[0]?.content}</p>
                <div className="mt-[32px]">
                    <p id="planet-subheader1" className="uppercase font-bold tracking-[1px] text-[18px] font-itcfranklinbold md:text-[32px]">{template.content[1]?.content}</p>
                    <p id="planet-content1" className="font-dentonlight text-[20px]">
                    {template.content[2]?.content}
                    </p>
                </div>
                <div className="mt-[32px]">
                    <p id="planet-subheader2" className="uppercase font-bold tracking-[1px] text-[18px] font-bold font-itcfranklinbold md:text-[32px]">{template.content[3]?.content}</p>
                    <p id="planet-content2" className="font-dentonlight text-[20px]">
                    {template.content[4]?.content}
                    </p>
                </div>
            </div>
        </div>
          ):('')
        )}
    </>
  )
}

export default Planet