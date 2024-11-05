import React from 'react';

export default function OfferedInList() {
  return (
    <div className='mt-4 flex text-[13px] gap-2 text-[#474747]'>
      <p className=''>Google offered in:</p>
      <div className='flex gap-2'>
        {data.map((item, i) => (
          <p className='text-[#1a0dab] hover:underline cursor-pointer' key={i}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

const data = [
  `हिन्दी`,
  `বাংলা`,
  `తెలుగు`,
  `मराठी`,
  `தமிழ்`,
  `ગુજરાતી`,
  `ಕನ್ನಡ`,
  `മലയാളം`,
  `ਪੰਜਾਬੀ`,
];
