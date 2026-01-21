import React, { useState, useEffect } from 'react';
import useImages, { fetchTemplates, Template } from '../functions/functions';
import Popup from './Popup';
import DeletePopup from './detelePopup'

import TemplateList from './templateList';


interface forInput {
  permission: string
  templateid: number
}

const Inputs: React.FC<forInput> = ({ permission, templateid }) => {
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [contentState, setContentState] = useState<{ [key: string]: string }>({});
  const [totalTemplates, setTotalTemplates] = useState<number>();
  const [userPermission, setUserPermission] = useState('');
  const [loadingbuttons, setLoadingbuttons] = useState<Boolean>(true);
  const [templateName, setTemplateName] = useState<string>(' ')
  const [visibility, setVisibility] = useState<boolean>(false)
  const templateImages = useImages(templates);
  const [popup, setPopup] = useState(false);
  const [toggle, setToggle] = useState(false);
  let i = -1;
  useEffect(() => {
    setTemplateId(templateid)
  }, [templateid])


  useEffect(() => {
    setUserPermission(permission)
  }, [permission])


  const fetchTemplatesData = async () => {
    setTemplateId(templateid)
    if (templateId !== null) {
      setLoadingbuttons(true);
      const fetchedTemplates = await fetchTemplates(templateId);


      setTemplates(fetchedTemplates);
      setTotalTemplates(templates[0]?.templateCount)




      const initialContent = fetchedTemplates.reduce((acc, template) => {
        template.content.forEach((item) => {
          acc[item.element_id] = item.content;
        });
        return acc;
      }, {} as { [key: string]: string });
      setContentState(initialContent);
      setLoadingbuttons(false);

    }
  };

  useEffect(() => {
    fetchTemplatesData();
  }, [templateId])

  useEffect(() => {
    setTemplateName(templates[0]?.template_name)
    //setVisibility(templates[0]?.is_visible)
  }, [templates])

  const handleContentChange = (elementId: string, newValue: string) => {
    setContentState((prevState) => ({
      ...prevState,
      [elementId]: newValue,
    }));
  };
  const handleUpdate = async (visible: number) => {
    if (templateId === null) {
      console.log('Template ID is null');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: templateId, newValue: visible, contentUpdates: contentState }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update record: ${errorData.message}`);
      }
      console.log('Update successful');
      await fetchTemplatesData();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //const moveUp=(index:any)=>{}
  //const moveDown=(index:any)=>{}

  return (
    <>
      <DeletePopup callPopup={popup} message='Are you sure you want  to delete this template?' onDelete={() => { handleUpdate(0) }} onCancel={() => { setPopup(false) }} />
      <div className='flex flex-1 w-[95%] h-[750px]'>
      
        <div className='mb-[10px]' onSubmit={(e) => e.preventDefault()}>

          <form>
            <label className='font-itcfranklinbold mr-[10px] text-[24px] uppercase'>Select template ID</label>
            <input
              className='focus:outline-none focus:border-black border-[1px] px-[12px] py-[4px] text-center items-center border-black w-[100px] caret-transparent'
              type='number'
              min='0'
              max={totalTemplates}
              value={templateId !== null ? templateId : ''}
              onChange={(e) => {
                setTemplateId(Number(e.target.value) || null);
                setLoadingbuttons(true);
              }}

              placeholder='ID'
            />
          </form>
          {templateId != null &&
            <div className='uppercase text-[20px] font-itcfranklinnormal mt-[8px] mb-[12px]'>template name:
              <span className='font-itcfranklinbold text-[24px] tracking-[1px]'> {templateName}</span></div>
          }
          {templateId !== null && templateId !== 0 && templates != undefined ? (
            <div className=' max-h-[75%] overflow-y-scroll'>

              {templates.some((template) => template.content.length === 0) && (
                <div className="text-red-600 text-[18px] mb-[10px] font-itcfranklinnormal uppercase tracking-[1px]">You need to upload the template</div>)}
              {templates
                .filter((template) => template.template_id === templateId)
                .map((template) => (
                  <div key={template.template_id}>
                    {template.content.map((item, index) => (
                      <div key={index}>

                        {item.element_type === 'text' && (
                          <>
                            <label className='font-itcfranklinnormal text-[18px] font-medium uppercase'>
                              Input for {item.element_id}
                            </label><br />
                            <textarea
                              className='min-w-[20%] w-[90%] focus:outline-none focus:border-black border-[#C8CBCC] border-[1px] max-w-[350px] resize px-[12px] w-[50%] py-[4px] text-black'
                              placeholder={item.content}
                              value={contentState[item.element_id] || ''}
                              onChange={(e) => handleContentChange(item.element_id, e.target.value)} />
                          </>

                        )}

                        {item.element_type === 'image' && (
                          templateImages ? (
                            <>
                              <label className='font-itcfranklinnormal text-[18px] font-medium uppercase' >
                                Input for {item.element_id}</label><br />
                              <img className="w-[30%]" id="image-header" src={templateImages[i += 1]} alt="header-image" />
                              <input
                                className='min-w-[20%] w-[80%] focus:outline-none focus:border-black border-[#C8CBCC] my-[10px] border-[1px] px-[12px] w-[50%] py-[4px] text-black'
                                type="text"
                                value={contentState[item.element_id] || ''}
                                onChange={(e) => handleContentChange(item.element_id, e.target.value)}
                              />
                            </>
                          ) : (
                            <p>Image not found</p>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                ))}


            </div>
          ) : (
            <>
              <div className='text-red-600 text-[18px] mb-[10px] font-itcfranklinnormal uppercase tracking-[1px]'>Select a template</div>
            </>
          )}
          <div className='mt-[10px]'>
            {loadingbuttons === false &&
              <>
                <button
                  onClick={() => handleUpdate(1)}
                  className='p-[8px] bg-black px-[14px] rounded-md pt-[10px] text-white uppercase mr-[20px] font-itcfranklinbold'>
                  Update/upload
                </button>
                {userPermission != 'restricted' ? (
                  <button
                    className='p-[8px] bg-black px-[14px] rounded-md pt-[10px] text-white uppercase font-itcfranklinbold'
                    onClick={() => setPopup(true)}>
                    Delete template
                  </button>) : (<></>)}
                {/*<Move templateId={templateId} onMoveUp={()=>{moveUp(templateId)}} onMoveDown={()=>{moveDown(templateId)}}/>*/}
              </>
            }
          </div>

        </div>

      </div>


    </>
  )
}

export default Inputs