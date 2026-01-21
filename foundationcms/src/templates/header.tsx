import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';


const Header2: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);


  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(1);
      
      setTemplates(templates);
      setLoading(false);
    };

    getTemplates();
  }, []);
  


  if (loading) {
    return <div>Loading...</div>;
  }
      //console.log({headerImage});
  return (
    
    <>
      {templates.map(
        (template, index) =>
          template.is_visible ? (
            <div key={index}>
              <div className=''>
                {templateImages ? (
                  <img className="  " id="image-header" src={templateImages[0]} alt="header-image" />
                ) : (
                  <p>Image not found</p>
                )}
              </div>
              <div>
                <span
                  id="color-header1"
                  className="font-bold text-[60px] uppercase leading-[60px] font-itcfranklinbold text-[#EDBB00] md:text-[120px] md:leading-[95px] xl:text-[225px] xl:leading-[170px]"
                >
                  {template.content[0]?.content}
                </span>
                <span
                  id="color-header2"
                  className="font-bold text-[60px] uppercase leading-[20px] font-itcfranklinbold md:text-[120px] md:leading-[95px] xl:text-[225px] xl:leading-[170px]"
                >
                  {template.content[1]?.content}
                </span>
              </div>
              <div>
                <span
                  id="color-header3"
                  className="font-bold text-[60px] uppercase leading-[40px] font-itcfranklinbold text-[#006C88] md:text-[120px] md:leading-[95px] xl:text-[225px] xl:leading-[170px]"
                >
                  {template.content[2]?.content}
                </span>
                <span
                  id="color-header4"
                  className="font-bold text-[60px] uppercase leading-[40px] font-itcfranklinbold md:text-[120px] md:leading-[95px] xl:text-[225px] xl:leading-[170px]"
                >
                  {template.content[3]?.content}
                </span>
              </div>
              <div>
                <span
                  id="color-header5"
                  className="font-bold text-[60px] uppercase leading-[60px] font-itcfranklinbold text-[#EC5B09] md:text-[120px] md:leading-[95px] xl:text-[225px] xl:leading-[170px]"
                >
                  {template.content[4]?.content}
                </span>
              </div>
            </div>
          ) :('')
      )}
    </>
  );
};

export default Header2;

