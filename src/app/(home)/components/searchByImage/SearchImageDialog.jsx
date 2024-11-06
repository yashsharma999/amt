import { useClickAway } from '@uidotdev/usehooks';
import React from 'react';
import CloseIconBtn from '../common/CloseIconBtn';
import ImageDropzone from './ImageDropzone';

export default function SearchImageDialog({ toggleSearchByImageDialog }) {
  const ref = useClickAway(() => {
    toggleSearchByImageDialog(false);
  });

  return (
    <div
      ref={ref}
      className='bg-white googleFont p-[20px] w-[592px] shadow-[0_4px_6px_rgba(32,33,36,.28)] rounded-[24px]'
    >
      <div className='flex justify-between mb-4'>
        <div>&nbsp;</div>
        <h2 className='text-secondary-light'>
          Search any image with Google Lens
        </h2>

        <CloseIconBtn onClose={() => toggleSearchByImageDialog(false)} />
      </div>
      <ImageDropzone />
    </div>
  );
}
