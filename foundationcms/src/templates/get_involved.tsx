import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';
import {Link} from 'react-router-dom'

const Get_involved: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const templateImages = useImages(templates);

  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(7);
      
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
          template.is_visible && (
        <div key={index} id="getinvolved" className="mt-[100px] mx-[-24px]  grid aspect-square">
          {templateImages ? (
            <>
                <img id="image-getinvolved" className=" h-[500px] object-cover w-full md:h-full" src={templateImages[0]} alt="get-involved" />
                </>
                  ) : (
                <p>Image not found</p>
              )}
                <div className="bg-white self-auto w-full mt-[-230px] flex flex-col">
                    <div className="flex justify-center">
                    {templateImages ? (
                          <>
                        <img id="logo-getinvolved" className="flex mt-[-92px] max-w-[200px]" src={templateImages[1]} alt="get-logo" />
                        </>
                  ) : (
                <p>Image not found</p>
              )}
                    </div>
                    <p id="getinvolved-header" className="self-center uppercase font-bold text-[48px] sm:text-[100px] font-itcfranklinbold">{template.content[0]?.content} </p>
                    <p id="getinvolved-content" className="self-center font-dentonlight mt-[24px] text-[20px]">{template.content[1]?.content} </p>
                    <Link id="getinvolved-cta" to={`/${template.content[3]?.content}`} className="uppercase font-bold text-[20px] text-white self-center mb-[32px] px-[64px] py-[6px] bg-black mt-[24px] font-itcfranklinbold">{template.content[2]?.content} </Link>
                </div>
            </div>
          ))}
    </>
  )
}

export default Get_involved