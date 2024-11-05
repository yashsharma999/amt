import Image from 'next/image';
import React from 'react';
import { FaRegClock } from 'react-icons/fa6';
import classNames from 'classnames';

export default function SuggestionText({ type = 'history', text }) {
  return (
    <div className='group mb-[2px] px-[20px] py-[2px] hover:bg-[#f0f1f1] rounded-[4px] flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        {type === 'history' ? (
          <FaRegClock className='text-[#9aa0a6] text-sm mr-2' />
        ) : (
          <svg
            className='h-[20px] w-[20px]'
            focusable='false'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='#9aa0a6'
          >
            <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
          </svg>
        )}

        <p
          className={classNames({
            'text-[#52188C]': type === 'history',
          })}
        >
          {text}
        </p>
      </div>
      {type === 'history' && (
        <button className='hidden group-hover:block text-[#707580] text-[13px] hover:text-[#1558d6] hover:underline'>
          Delete
        </button>
      )}
    </div>
  );
}
