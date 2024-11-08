import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { MdMic } from 'react-icons/md';

export default function SearchByAudio({ toggleSearchByAudio }) {
  const [listening, setListening] = useState(false);

  function getLocalStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          }
        )

        // Success callback
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
        })

        // Error callback
        .catch((err) => {
          console.error(`The following getUserMedia error occurred: ${err}`);
        });
    } else {
      console.log('getUserMedia not supported on your browser!');
    }
  }
  useEffect(() => {
    getLocalStream();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setListening(true);
    }, [2500]);

    return () => clearInterval(timeout);
  }, []);

  return (
    <div
      onClick={() => toggleSearchByAudio(false)}
      className="fixed flex flex-col justify-center items-center top-0 left-0 h-screen w-screen bg-white z-20"
    >
      <button
        className="p-[2px] fixed top-4 right-4"
        onClick={() => toggleSearchByAudio(false)}
      >
        <svg
          height={16}
          width={16}
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="flex w-[700px] justify-between items-center">
        {listening ? (
          <h1 className="text-4xl text-[#5F6368] animated-text">
            <span>L</span>
            <span>i</span>
            <span>s</span>
            <span>t</span>
            <span>e</span>
            <span>n</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </h1>
        ) : (
          <h1 className="text-4xl text-[#5F6368]">Speak Now</h1>
        )}

        <div className="relative">
          <div
            className={classNames(
              'absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 flex justify-center items-center bg-white rounded-full lightShadow',
              {
                '!bg-[#EA4355]': listening,
              }
            )}
          >
            <MdMic
              className={classNames('text-[92px] text-[#EA4355]', {
                '!text-white': listening,
              })}
            />
          </div>
          {listening && (
            <div className="pulsating-element-recorder z-10 !top-1/2 !left-1/2 !h-[250px] !w-[250px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
