import React from 'react';
import ButtonGray from '../common/ButtonGray';
import SuggestionText from './SuggestionText';

export default function SuggestionBox() {
  return (
    <div className='mt-[-3px]'>
      <div
        style={{
          clipPath: 'inset(0px -10px -10px -10px)',
        }}
        className='bg-white pb-[20px] w-[580px] border-[1px] border-[#dfe1e5] border-t-0  pt-0  shadow-[0_1px_6px_rgba(32,33,36,.28)] rounded-bl-[24px] rounded-br-[24px]'
      >
        <div className='border-t-[1px] border-[#e8eaed] w-[95%] mx-auto pb-[10px]'></div>
        {mock.map((item) => (
          <SuggestionText text={item.text} type={item.type} />
        ))}
        <div className='flex justify-center gap-1 mt-2'>
          <ButtonGray>Google Search</ButtonGray>
          <ButtonGray>{`I'm Feeling Lucky`}</ButtonGray>
        </div>
      </div>
    </div>
  );
}

const mock = [
  {
    type: 'history',
    text: 'test',
  },
  {
    type: 'history',
    text: 'testing',
  },
  {
    type: 'history',
    text: 'test 123',
  },
  {
    type: 'suggestion',
    text: 'test hero',
  },
  {
    type: 'suggestion',
    text: 'test 11122123',
  },
];
