import React from 'react';
import ImageCropper from './ImageCropper';
import Results from './results/Results';

export default function MainSection() {
  return (
    <div className="flex h-[calc(100vh-62px)] googleFont">
      <div className="w-1/2 h-full">
        {' '}
        <ImageCropper />
      </div>
      <div className="w-1/2 h-full">
        {' '}
        <Results />
      </div>
    </div>
  );
}
