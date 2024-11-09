import React from 'react';

export default function ButtonGray({ children, onClick }) {
  return (
    <button
      className={'hover:bg-[#F9F9F9] p-[6px] pr-3 rounded-[4px]'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
