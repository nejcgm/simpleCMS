
import React, { useEffect, useState } from 'react';



type ComponentName = 'TheFoundation' | 'Funding' | 'OurTeam' | 'JoinTheTeam' | 'ContactUs';

const Move: React.FC = () => {
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [componentNames, setComponentNames] = useState<ComponentName[]>([]);

  const fetchOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/order');
      const data: { t_name: ComponentName; t_order: number }[] = await response.json();
      const sortedNames = data
        .sort((a, b) => a.t_order - b.t_order)
        .map((item) => item.t_name);
      setComponentNames(sortedNames);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    }
  };

  const updateOrder = async () => {
    try {
      await fetch('http://localhost:8080/api/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ componentNames }),
      });
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...componentNames];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    setComponentNames(newOrder);
    setTriggerEffect((prev) => !prev);
  };

  const moveDown = (index: number) => {
    if (index === componentNames.length - 1) return;
    const newOrder = [...componentNames];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setComponentNames(newOrder);
    setTriggerEffect((prev) => !prev);
  };
  
  useEffect(() => {
      fetchOrder();
      updateOrder();
      fetchOrder();
  }, [triggerEffect]);

  return (
    <div>
      {componentNames.map((name, index) => (
        <div key={name} 
        className="flex justify-between 
        w-[80%] my-[8px] border-[1px]
         border-[#C8CBCC] px-3 py-[3px] 
         gap-3 items-center  hover:bg-[#F5F5F5]"
         >
          <span className='font-itcfranklinnormal uppercase tracking-[1px]'>{name}</span>
          <div className='flex gap-3'>
          <button
            className="text-red-600 font-itcfranklinnormal text-[18px]"
            onClick={() => moveUp(index)}
            disabled={index === 0}
          >
            Move Up
          </button>
          <button
            className="text-red-600 font-itcfranklinnormal text-[18px]"
            onClick={() => moveDown(index)}
            disabled={index === componentNames.length - 1}
          >
            Move Down
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Move;
