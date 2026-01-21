import React, { useState, useEffect } from 'react';
import arrow from '../assets/arrow.png'

interface forTemplateList {
    selectedTemplate:any
}

interface FilteredTemplate {
  template_id: number;
  template_name: string;
}

const TemplateList: React.FC<forTemplateList> = ({ selectedTemplate}) => {
  const [templates, setTemplates] = useState<FilteredTemplate[]>([]);
  const [searchTerm,setSearchTerm]= useState('')
  const [newList,setNewList] = useState <FilteredTemplate[]>([])

  const fetchTemplateNames = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8080/api/templates');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: FilteredTemplate[] = await response.json();

      const filteredTemplates = data.map(({ template_id, template_name }) => ({
        template_id,
        template_name,
      }));

      setTemplates(filteredTemplates);
      setNewList(filteredTemplates)
    } catch (error) {
      console.error('Error fetching templates:', (error as Error).message);
    }
  };
 
  useEffect(() => {
    fetchTemplateNames();
  }, []);
  
  const handleSelect = (id:any)=>{
    selectedTemplate(id)
  }
  useEffect(()=>{
   setNewList(templates.filter((template) => 
        template.template_name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
  },[searchTerm])
  console.log(newList)

  return (
    <>
    <div className='flex flex-col h-[90%]'>
    <div className=''>
        <h1 className='font-itcfranklinbold text-[24px] uppercase'>Select a template by name:</h1>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 focus:outline-none focus:border-black border-[#C8CBCC] my-[10px] border-[1px] px-[12px] text-black mb-[24px]"
      />
    </div>
    <div className='max-h-[80%] overflow-scroll '>
      <ul>
      {newList.length > 0 ? (
        newList.map((template) => (
         <button   className='
         w-full flex flex-col 
         px-2.5 py-1 
         border-t border-l border-r border-[#C8CBCC] 
         bg-white hover:bg-[#F5F5F5] 
        focus:bg-[#EBEBEB]
         transition-all'
         onClick={()=>{handleSelect(template.template_id)}}> <li key={template.template_id} className=' font-itcfranklinnormal uppercase text-[18px] focus:text-[24px]'>
            {template.template_name}
        </li></button>
        ))):(<div className='uppercase font-itcfranklinnormal text-red-600 tracking-[1px] text-[18px]'>no results found</div>)}
      </ul>
    </div>
    </div>
    </>
  );
};

export default TemplateList;
