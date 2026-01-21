import React, { useEffect, useState } from 'react';
import useImages, { fetchTemplates, Template } from '../functions/functions';

const InvolvedHead = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(25);

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
              <h1 className='md:z-20 mt-[64px] text-[60px] leading-[50px] uppercase font-itcfranklinbold md:text-[220px] md:leading-[170px]'>
                {template.content[0]?.content}
                <br />
                {template.content[1]?.content}  
              </h1>
              <p className='text-[30px] leading-[24px] md:text-[100px] md:leading-[80px] uppercase font-itcfranklinbold '>{template.content[2]?.content}</p>
              <div>
              {templateImages ? (
                <img src={templateImages[0]} alt="" />
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

export default InvolvedHead