import React from 'react';

export default function ButtonBlue({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[#1a73e8] text-sm px-5 rounded-[4px] py-2 hover:bg-[#F6FAFE] hover:text-[#174ea6]"
    >
      {children}
    </button>
  );
}
