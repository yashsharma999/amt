import React, { useState } from 'react';

export default function AccountBtn() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="relative group">
      <div className=" cursor-pointer h-[40px] ml-2 mr-1 w-[40px] rounded-full flex justify-center items-center hover:bg-[#f0f1f1] transition-all ease-in">
        <div className="rounded-full h-[32px] w-[32px] bg-green-700 flex justify-center items-center text-white">
          Y
        </div>
      </div>
      {showInfo && (
        <div className="hidden group-hover:block bg-[#555857] leading-[1.4] px-2 py-1 text-[12px] rounded-[4px] absolute origin-top-right top-[45px] right-0 ">
          <p className="text-white ">Google Account</p>
          <p className="text-[#acacac]">Yash Sharma 5273</p>
          <p className="text-[#acacac]">syash5575@gmail.com</p>
        </div>
      )}
    </div>
  );
}
