import React, { useEffect, useState } from 'react';
import useImages,{ fetchTemplates, Template } from '../functions/functions';
import TeamCard from './team_card'
const OurTeam = () => {
const [templates, setTemplates] = useState<Template[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const templateImages = useImages(templates);
  
  
  useEffect(() => {
    const getTemplates = async () => {
      const templates = await fetchTemplates(16);
      
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
  <div key={index} className='mt-[200px]'>
    <div className='uppercase font-itcfranklinbold text-[30px] md:text-[100px] text-[#EC5B09] leading-[30px] md:leading-[70px]'>{template.content[0]?.content}</div>
    <div className='uppercase font-itcfranklinbold tracking-[2px] text-[18px] md:text-[32px]'>{template.content[1]?.content}</div>
        <div className='mt-[64px] grid sm:grid-cols-2 lg:grid-cols-3 gap-[32px] mb-[56px] lg:mb-[64px]'>
            <TeamCard template_id={Number(template.content[3]?.content)}/>
            <TeamCard template_id={Number(template.content[4]?.content)}/>
            <TeamCard template_id={Number(template.content[5]?.content)}/>
            <TeamCard template_id={Number(template.content[6]?.content)}/>
            <TeamCard template_id={Number(template.content[7]?.content)}/>
        </div>
        <p className='text-[18px] md:text-[32px] uppercase font-itcfranklinbold tracking-[2px]'>{template.content[2]?.content}</p>
        <div className='mt-[64px] grid sm:grid-cols-2 lg:grid-cols-3 gap-[32px] mb-[56px] lg:mb-[64px]'>
        <TeamCard template_id={Number(template.content[8]?.content)}/>
        </div>
    </div>
    ) :('')
)}
</>
  )
}

export default OurTeam