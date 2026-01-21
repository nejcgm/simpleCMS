import { Link, useNavigate } from 'react-router-dom'
import Frank_hanke from '../assets/frank-henke.png'
import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';

 
interface forCard{
template_id:number
}
const TeamCard:React.FC<forCard> = ({template_id}) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const templateImages = useImages(templates);
    const navigate = useNavigate();
  
  
  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(template_id);
      
      setTemplates(templates);
      setLoading(false);
    };
  
    getTemplates();
  }, []);

  
  return (
    <>
      {templates.map(
        (template, index) =>
          template.is_visible ? (
    <div key={index}>
    <a href={`/about-us/${Number(template.content[5]?.content)}`}>
 <div className="relative group">
  <svg
    className="group-hover:fill-[#ec5b09] fill-[#D7D4D0] duration-300 transition-all absolute"
    width="100%"
    viewBox="0 0 385 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M83.8388 225.702L84.0637 226.335C108.972 296.428 192.626 336.779 267.363 306.759C340.573 277.353 369.264 160.793 352.986 114.983C340.598 80.1245 322.63 55.5508 289.824 39.3879C257.89 23.6546 205.493 11.9244 171.517 37.0412C104.783 81.4891 84.8039 124.189 75.8997 151.933C67.0531 179.498 73.7818 203.032 83.5671 225.089L83.8388 225.702ZM167.95 27.004C29.0307 119.218 43.9495 187.343 64.6984 234.113C93.1453 314.165 185.494 351.23 270.966 316.898C356.437 282.567 394.715 190.552 374.218 109.789C356.049 38.2002 264.007 -25.9868 167.95 27.004Z"
      
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M312.435 218.199L312.211 218.832C287.303 288.924 203.649 329.276 128.911 299.256C55.7012 269.85 27.0097 153.29 43.2887 107.48C55.6758 72.6213 73.6446 48.0477 106.45 31.8848C138.384 16.1514 190.781 4.42125 224.757 29.538C291.491 73.9859 311.47 116.686 320.375 144.43C329.221 171.995 322.492 195.529 312.707 217.586L312.435 218.199ZM228.324 19.5009C367.243 111.715 352.325 179.839 331.576 226.61C303.129 306.662 210.78 343.726 125.308 309.395C39.837 275.064 1.55965 183.049 22.0565 102.286C40.225 30.6971 132.267 -33.4899 228.324 19.5009Z"
      
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.759 86.5653L63.2235 87.0635C3.91578 142.241 5.42183 236.468 74.746 289.797C142.654 342.037 277.337 313.46 316.098 277.397C345.593 249.956 361.635 222.288 361.393 185.178C361.157 149.054 346.279 96.3599 302.963 77.4725C222.91 38.0933 168.701 40.0296 135.576 44.962C102.665 49.8625 81.9112 66.9161 64.2493 86.0345L63.759 86.5653ZM311.455 69.5712C145.132 -12.5508 82.7113 32.7066 45.2608 73.2453C-22.4737 136.263 -13.1138 236.79 66.167 297.779C145.448 358.768 259.807 350.29 332.362 294.105C396.675 244.301 415.379 131.384 311.455 69.5712Z"
      
    />
  </svg>
  {templateImages ? (
    <>
  <img className='relative w-full flex self-end' src={templateImages[0]} alt="" />
  </>
        ) : (
          <p>Image not found</p>
        )}
</div>
<div className='pt-[32px]'>
    <p className='font-itcfranklinbold uppercase tracking-[2px]'>{template.content[1]?.content}</p>
    <p className='font-itcfranklinbold uppercase tracking-[2px] text-[30px]'>{template.content[2]?.content}</p>
    <p className='font-itcfranklinbold uppercase tracking-[2px] text-[14px] underline'>{template.content[3]?.content}</p>
</div>
</a>
{!template.content[4]?.content ? (' ') : (
<a target='_blank' href={template.content[4]?.content}><svg className='mt-[16px]' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="icon/linkedin">
<path id="vector" d="M21 4.32353V19.6765C21 20.0275 20.8606 20.3641 20.6123 20.6123C20.3641 20.8606 20.0275 21 19.6765 21H4.32353C3.97251 21 3.63586 20.8606 3.38765 20.6123C3.13944 20.3641 3 20.0275 3 19.6765V4.32353C3 3.97251 3.13944 3.63586 3.38765 3.38765C3.63586 3.13944 3.97251 3 4.32353 3H19.6765C20.0275 3 20.3641 3.13944 20.6123 3.38765C20.8606 3.63586 21 3.97251 21 4.32353ZM8.29412 9.88235H5.64706V18.3529H8.29412V9.88235ZM8.53235 6.97059C8.53375 6.77036 8.49569 6.57182 8.42035 6.3863C8.34502 6.20078 8.23387 6.03191 8.09328 5.88935C7.95268 5.74678 7.78537 5.6333 7.60091 5.5554C7.41646 5.47749 7.21846 5.43668 7.01824 5.43529H6.97059C6.5634 5.43529 6.17289 5.59705 5.88497 5.88497C5.59705 6.17289 5.43529 6.5634 5.43529 6.97059C5.43529 7.37777 5.59705 7.76828 5.88497 8.05621C6.17289 8.34413 6.5634 8.50588 6.97059 8.50588C7.17083 8.51081 7.37008 8.47623 7.55696 8.40413C7.74383 8.33202 7.91467 8.2238 8.0597 8.08565C8.20474 7.94749 8.32113 7.78212 8.40223 7.59897C8.48333 7.41582 8.52755 7.21848 8.53235 7.01824V6.97059ZM18.3529 13.2071C18.3529 10.6606 16.7329 9.67059 15.1235 9.67059C14.5966 9.6442 14.0719 9.75644 13.6019 9.9961C13.1318 10.2358 12.7328 10.5945 12.4447 11.0365H12.3706V9.88235H9.88235V18.3529H12.5294V13.8476C12.4911 13.3862 12.6365 12.9283 12.9339 12.5735C13.2313 12.2186 13.6567 11.9954 14.1176 11.9524H14.2182C15.06 11.9524 15.6847 12.4818 15.6847 13.8159V18.3529H18.3318L18.3529 13.2071Z" fill="black"/>
</g>
</svg></a>)}
</div>
  ) :('')
)}
    </>
  )
}

export default TeamCard