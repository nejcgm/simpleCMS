import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const Programs: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(3);
      
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
    <div key={index}>
    <p id="programs-header" className="uppercase text-[32px] md:text-[100px] my-[48px] font-bold font-itcfranklinbold">{template.content[0]?.content}</p>
    <p id="programs-content" className="max-w-[800px] font-dentonlight text-[20px] lg:w-[50%]">
    {template.content[1]?.content}
    </p>

    <div className="mb-[150px] mt-[32px] items-center flex gap-[48px]">
      <a className='h-full flex' href="#people">
        <div className="flex items-center flex-col space-between gap-4">
        {templateImages ? (
          <img
            id="image-yellow"
            className="max-w-[120px]"
            src={templateImages[0]}
            alt="Yellow Mission"
          />
        ) : (
          <p>Image not found</p>
        )}
          <div
            id="mission-nav1"
            className="uppercase text-[#EDBB00] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[2]?.content}
          </div>
        </div>
      </a>

      <a href="#planet">
        <div className="grid justify-items-center">
        {templateImages ? (
          <img
            id="image-green"
            src={templateImages[1]}
            alt="Green Mission"
            className='max-w-[120px]'
          />
        ) : (
          <p>Image not found</p>
        )}
          <span
            id="mission-nav2"
            className="uppercase text-[#006C88] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[3]?.content}
          </span>
        </div>
      </a>

      <a href="#relief">
        <div className="grid gap-4 justify-items-center">
        {templateImages ? (
          <img
            id="image-red"
            src={templateImages[2]}
            alt="Red Mission"
            className='max-w-[120px]'
          />
        ) : (
          <p>Image not found</p>
        )}
          <span
            id="mission-nav3"
            className="uppercase text-[#EC5B09] text-[32px] font-bold font-itcfranklinbold"
          >
            {template.content[4]?.content}
          </span>
        </div>
      </a>
    </div>
  </div>
    ):('')
  )}
  </>
  )
}

export default Programs