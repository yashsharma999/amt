import React, { useState } from 'react';
import ButtonBlue from '../common/ButtonBlue';
import { roboto } from './ResultBox';
const YES = 'Yes';
const NO = 'No';

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState(null);
  return (
    <>
      <div className="mx-auto border-t border-[#f0f0f0] h-full w-[90%] flex justify-between items-center">
        <div className="flex gap-2">
          <svg focusable="false" width="18" height="18" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12z"></path>
            <path d="M11 12h2v2h-2zm0-6h2v4h-2z"></path>
          </svg>
          <p className={`text-[#5F6368] text-[12px] ${roboto.className}`}>
            {feedback
              ? feedback === YES
                ? 'Thanks for helping us improve Lens'
                : 'What could have been better?'
              : 'Did you find these results useful?'}
          </p>
        </div>
        {feedback === null ? (
          <div className="flex gap-1">
            <ButtonBlue onClick={() => setFeedback(YES)}>Yes</ButtonBlue>
            <ButtonBlue onClick={() => setFeedback(NO)}>No</ButtonBlue>
          </div>
        ) : (
          <ButtonBlue>Send feedback</ButtonBlue>
        )}
      </div>
    </>
  );
}
