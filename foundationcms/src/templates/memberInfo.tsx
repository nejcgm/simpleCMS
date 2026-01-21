import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';
import { Link, useNavigate, useParams  } from 'react-router-dom'
import Full_henke from '../assets/frank_henke_full.png'

const MemberInfo = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const templateImages = useImages(templates);
    const {id} = useParams();
 
    useEffect(() => {
      const getTemplates = async () => {
        const templates = await fetchTemplates(Number(id));
        
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
                <div>
                    <Link to={'/about-us'}><svg className='h-[32px] w-[32px] md:h-[64px] md:w-[64px]' viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 32H56M8 32L28 12M8 32L28 52" stroke="black" stroke-width="3" />
                    </svg></Link>
                </div>
                <div>
                    <p className='font-itcfranklinbold uppercase text-[32px] md:text-[100px] leading-[28px] mt-[32px] md:mt-[64px] md:leading-[75px]'>{template.content[0]?.content}</p>
                    <p className='font-itcfranklinbold uppercase tracking-[2px] text-[18px] md:text-[32px] '>{template.content[1]?.content}</p>
                    {!template.content[11]?.content ? (' ') : (
                    <a target='_blank' href={template.content[11]?.content}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="icon/linkedin">
                            <path id="vector" d="M21 4.32353V19.6765C21 20.0275 20.8606 20.3641 20.6123 20.6123C20.3641 20.8606 20.0275 21 19.6765 21H4.32353C3.97251 21 3.63586 20.8606 3.38765 20.6123C3.13944 20.3641 3 20.0275 3 19.6765V4.32353C3 3.97251 3.13944 3.63586 3.38765 3.38765C3.63586 3.13944 3.97251 3 4.32353 3H19.6765C20.0275 3 20.3641 3.13944 20.6123 3.38765C20.8606 3.63586 21 3.97251 21 4.32353ZM8.29412 9.88235H5.64706V18.3529H8.29412V9.88235ZM8.53235 6.97059C8.53375 6.77036 8.49569 6.57182 8.42035 6.3863C8.34502 6.20078 8.23387 6.03191 8.09328 5.88935C7.95268 5.74678 7.78537 5.6333 7.60091 5.5554C7.41646 5.47749 7.21846 5.43668 7.01824 5.43529H6.97059C6.5634 5.43529 6.17289 5.59705 5.88497 5.88497C5.59705 6.17289 5.43529 6.5634 5.43529 6.97059C5.43529 7.37777 5.59705 7.76828 5.88497 8.05621C6.17289 8.34413 6.5634 8.50588 6.97059 8.50588C7.17083 8.51081 7.37008 8.47623 7.55696 8.40413C7.74383 8.33202 7.91467 8.2238 8.0597 8.08565C8.20474 7.94749 8.32113 7.78212 8.40223 7.59897C8.48333 7.41582 8.52755 7.21848 8.53235 7.01824V6.97059ZM18.3529 13.2071C18.3529 10.6606 16.7329 9.67059 15.1235 9.67059C14.5966 9.6442 14.0719 9.75644 13.6019 9.9961C13.1318 10.2358 12.7328 10.5945 12.4447 11.0365H12.3706V9.88235H9.88235V18.3529H12.5294V13.8476C12.4911 13.3862 12.6365 12.9283 12.9339 12.5735C13.2313 12.2186 13.6567 11.9954 14.1176 11.9524H14.2182C15.06 11.9524 15.6847 12.4818 15.6847 13.8159V18.3529H18.3318L18.3529 13.2071Z" fill="black" />
                        </g>
                    </svg></a>)}
                </div>
                <div className='md:flex'>
                    <div className='mt-[32px]'>
                    {templateImages ? (
                        <img src={templateImages[0]}  alt="" />
                    ) : (
                        <p>Image not found</p>
                      )}
                    </div>
                    <div className='md:w-[50%] mt-[24px] md:ml-[64px] mb-[200px]'>
                        <p className='tracking-[2xp] uppercase font-itcfranklinbold text-[18px] md:text-[32px]'>{template.content[2]?.content}</p>
                        <p className='text-[16px] font-dentonlight text-[#121212]'>{template.content[3]?.content}</p>

                        <p className='tracking-[2xp] uppercase font-itcfranklinbold text-[18px] md:text-[32px] mt-[32px]'>{template.content[4]?.content}</p>
                        <p className='text-[16px] font-dentonlight text-[#121212]'>
                        {template.content[5]?.content}
                        </p>

                        <p className='tracking-[2xp] uppercase font-itcfranklinbold text-[18px] md:text-[32px] mt-[32px]'>{template.content[6]?.content}</p>
                        <p className='text-[16px] font-dentonlight text-[#121212]'>{template.content[7]?.content}</p>

                        <p className='tracking-[2xp] uppercase font-itcfranklinbold text-[18px] md:text-[32px] mt-[32px]'>{template.content[8]?.content}</p>
                        <p className='text-[16px] font-dentonlight text-[#121212]'>{template.content[9]?.content}</p>
                    </div>
                </div>
            </div>
            ) :('')
        )}
        </>
    )
}

export default MemberInfo