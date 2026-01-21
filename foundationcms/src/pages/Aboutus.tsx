import TheFoundation from "../templates/theFoundation";
import Funding from "../templates/funding";
import OurTeam from "../templates/our_team";
import JoinTheTeam from "../templates/joinTheTeam";
import ContactUs from "../templates/contact_us";
import { useEffect, useState } from "react";

// Define component names as types for better type safety
type ComponentName = 'TheFoundation' | 'Funding' | 'OurTeam' | 'JoinTheTeam' | 'ContactUs';

// Mapping each component name to its JSX element
const componentMapping: Record<ComponentName, JSX.Element> = {
  TheFoundation: <TheFoundation />,
  Funding: <Funding />,
  OurTeam: <OurTeam />,
  JoinTheTeam: <JoinTheTeam />,
  ContactUs: <ContactUs />,
};

const AboutUs = () => {
  // Initial state stores the order of component names
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [componentNames, setComponentNames] = useState<ComponentName[]>([]);

  const getOrder =async()=>{
    type Template = {
      t_name: string;
      t_order: number;
    };

    const response = await fetch('http://localhost:8080/api/order')
    const data: Template[] = await response.json();
    console.log(data);
    const sortedNames:any = data
    .sort((a, b) => a.t_order - b.t_order)
    .map(item => item.t_name);
    console.log(componentNames)
    setComponentNames(sortedNames);
  }
 
 useEffect(()=>{
  getOrder();
 },[])
 
 // console.log(componentNames);

  // Move component up in the order
  

  return (
    <div>
      {componentNames.map((componentName, index) => (
        <div key={componentName}>
          <div className="gap-3 flex">
           
          </div>
          {componentMapping[componentName]} {/* Render component based on its name */}
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
