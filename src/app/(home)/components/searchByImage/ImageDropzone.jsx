import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SearchImageLink from './SearchImageLink';
import { useRouter } from 'next/navigation';
//jpg, .png, .bmp, .tif or .webp
export default function ImageDropzone() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (file) => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    );

    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', file);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        console.log('url', url);
        router.push(`/lens?q=${`${url}${fields.key}`}`);
        // alert('Upload successful!', uploadResponse);
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        alert('Upload failed.');
      }
    } else {
      alert('Failed to get pre-signed URL.');
    }

    setUploading(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('accepted files', acceptedFiles);
    handleSubmit(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
    },
    maxFiles: 1,
    maxSize: 500000,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div
        className={classNames(
          'flex flex-col text-[#5F6368] h-[278px] rounded-[8px] p-[20px] border-[1px] border-[#c0c0c0] border-dashed bg-background-light ',
          {
            '!bg-[#e5edff]': isDragActive,
          }
        )}
      >
        {isDragActive ? (
          <div className="h-full flex flex-col justify-center items-center">
            Drop an image here
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-grow gap-4 items-center">
              <svg
                width="59"
                height="45"
                viewBox="0 0 59 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M40.3332 13.747L1.58323 13.747L1.58323 43.4553L40.3332 43.4553L40.3332 13.747Z"></path>
                <path d="M40.3332 13.747L17.0832 13.747L17.0832 33.122L40.3332 33.122L40.3332 13.747Z"></path>
                <path
                  d="M0.614479 12.7783L6.74988 12.7783L6.74988 14.7158L2.55198 14.7158L2.55198 18.9137L0.614479 18.9137L0.614479 12.7783Z"
                  fill="#BDC1C6"
                ></path>
                <path
                  d="M39.3644 42.4866L39.3644 38.2887L41.3019 38.2887L41.3019 44.4241L35.1665 44.4241L35.1665 42.4866L39.3644 42.4866Z"
                  fill="#BDC1C6"
                ></path>
                <path
                  d="M0.614479 38.2887L2.55198 38.2887L2.55198 42.4866L6.74987 42.4866L6.74987 44.4241L0.614479 44.4241L0.614479 38.2887Z"
                  fill="#BDC1C6"
                ></path>
                <path
                  d="M19.6665 30.2531H58.4165L58.4165 0.544722H19.6665L19.6665 30.2531Z"
                  fill="#AECBFA"
                ></path>
                <path
                  d="M19.6665 21.8429L19.6665 30.2525L58.4168 30.2525L58.4168 19.7406L49.6667 12.4069C48.6234 11.5342 47.2931 11.0699 45.9272 11.1018C44.5614 11.1337 43.2547 11.6596 42.2542 12.5801L33.4166 20.7918L28.4166 17.2548C27.7332 16.7781 26.9013 16.5563 26.0684 16.6288C25.2354 16.7012 24.4554 17.0632 23.8666 17.6505L19.6665 21.8429Z"
                  fill="#669DF6"
                ></path>
                <path
                  d="M30.0056 12.9386C31.7315 12.9386 33.1306 11.5395 33.1306 9.8136C33.1306 8.08773 31.7315 6.68863 30.0056 6.68863C28.2798 6.68863 26.8807 8.08773 26.8807 9.8136C26.8807 11.5395 28.2798 12.9386 30.0056 12.9386Z"
                  fill="#E8F0FE"
                ></path>
              </svg>

              <div>
                Drag an image here or{' '}
                <span>
                  <button
                    className="text-[#1967D2] "
                    type="button"
                    onClick={open}
                  >
                    upload a file
                  </button>
                </span>
              </div>
            </div>
            <SearchImageLink />
          </>
        )}
      </div>
    </div>
  );
}
