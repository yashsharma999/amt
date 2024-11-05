import React from 'react';

export default function ButtonGray({ children }) {
  return (
    <button
      className='bg-[#f8f9fa] border border-[#f8f9fa] rounded-md text-[#3c4043] text-[14px] m-[11px_4px] p-[0_16px] leading-[27px] h-[36px] min-w-[54px] text-center select-none
    hover:bg-[#f8f9fa] hover:border hover:border-[#dadce0] hover:text-[#202124] hover:shadow-[0_1px_1px_rgba(0,0,0,0.1)]
    '
    >
      {children}
    </button>
  );
}
