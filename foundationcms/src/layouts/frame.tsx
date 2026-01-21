import React from 'react';

// Wrapper Component
const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
  <>
    <div className="justify-center  bg-[#EDEAE3] flex mt-[90px]">
      <div className="max-w-[1440px]  mx-[24px] lg:px-[64px]">
        {children}
      </div>
    </div>
  </>
  );
};

export default Frame;
