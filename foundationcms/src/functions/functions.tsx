import {useState, useEffect} from 'react';

// templateUtils.ts
export interface TemplateContent {
    element_type: 'image' | 'text';
    content_id:number;
    content: string; 
    element_id:string;
  }
  
  export interface Template {
    template_id: number;
    template_name: string;
    is_visible: boolean;
    content: TemplateContent[];
    templateCount:number;
  }
  
  
  export const fetchTemplates = async (id:number): Promise<Template[]> => {
    try {
      const response = await fetch('http://localhost:8080/api/templates');
      const data = await response.json();
      const template =  data.find((template: Template) => template.template_id === id);
      template.templateCount = data.length;

    return template ? [template] : [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
  };
  
  // image loading
  export const loadImage = async (imagePath: string): Promise<string | null> => {
    try {
      const imageModule = await import(`../assets/${imagePath}.png`);
      return imageModule.default;
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  };
  
//image rendering
  const useImages =(templates: Template[]) => {
    const [templateImage, setTemplateImage] = useState<string[]>([]);

    useEffect(() => {
      const loadTemplateImages = async () => {
        
        const visibleTemplate = templates.find((template) => template.is_visible);
    
        if (visibleTemplate) {
          const imagePaths = visibleTemplate.content
            .filter((item) => item.element_type === 'image')
            .map((item) => item.content); 
    
          
          const loadedImages:string = await Promise.all(
            imagePaths.map(async (imagePath) => {
              const image = await loadImage(imagePath);
              return image;
            })
          );
    
          setTemplateImage(loadedImages); 
        }
      };
    
      if (templates.length > 0) {
        loadTemplateImages();
      }
    }, [templates]);
    return templateImage;
  };
export default useImages;