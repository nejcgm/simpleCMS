import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

interface forPopup {
  callPopup: boolean;
  message: string;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

const Popup: React.FC<forPopup> = ({ callPopup, message, onDelete, onCancel }) => {
  const [ok, setOk] = useState<boolean | null>(false);

  useEffect(() => {
    setOk(callPopup); 
  }, [callPopup]);

  const handleOk = () => {
    setOk(false);  
    onCancel();  
  };

  const handleDelete = () => {
    handleOk(); 
    onDelete(0);  
  };

  const popupContent = (
    <div
      className={`${
        ok ? "flex" : "hidden"
      } flex-col fixed top-0 left-0 w-full h-full bg-neutral-950/[.2] justify-center items-center z-[9999]`}
    >
      <div className="w-[512px] bg-white">
        <div className="flex justify-center items-center bg-[#D64C47] text-white font-bold text-[18px] uppercase tracking-[2px] pt-[8px] pb-[4px] font-itcfranklinbold">
          Warning
        </div>
        <div className="p-[24px]">
          <div className="tracking-[1px] font-itcfranklinnormal">{message}</div>
          <div className="w-full flex justify-end gap-4">
            <button
              onClick={handleOk}
              className="mt-[24px] bg-gray-600 text-white text-[14px] uppercase tracking-[2px] py-[8px] px-[32px] font-itcfranklinnormal"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="mt-[24px] bg-[#D64C47] text-white text-[14px] uppercase tracking-[2px] py-[8px] px-[32px] font-itcfranklinnormal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  

  return ReactDOM.createPortal(popupContent, document.body); 
};

export default Popup;
