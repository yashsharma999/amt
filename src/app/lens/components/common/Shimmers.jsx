import React from 'react';

export default function Shimmers() {
  return (
    <div className="pulsating-opacity">
      <div className="mb-8">
        <div className="shimmer-line rounded-md w-[200px]"></div>
        <div className="shimmer-line rounded-md w-[120px]"></div>
      </div>
      <div className="flex gap-4 w-full mb-16">
        <div className="shimmer-line !h-[150px] !w-[150px] rounded-md"></div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="shimmer-line rounded-md w-[150px]"></div>
            <div className="shimmer-line rounded-md"></div>
            <div className="shimmer-line rounded-md !w-[200px]"></div>
          </div>
          <div className="shimmer-line rounded-md !h-[32px] !w-[200px]"></div>
        </div>
      </div>
      <div className="grid grid-cols-4 w-full gap-1 relative">
        <div className="shimmer-line !h-[150px] w-full rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="shimmer-line !h-[150px] w-full  rounded-md"></div>
        <div className="absolute bottom-0 left-0 h-[300px] w-full bg-cover bg-gradient-to-b from-transparent to-white"></div>
      </div>
    </div>
  );
}
