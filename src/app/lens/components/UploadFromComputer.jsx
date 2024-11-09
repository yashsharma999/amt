import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { roboto } from './results/ResultBox';
import { fontGoogleSans } from './UploadButton';

export default function UploadFromComputer({ onClose }) {
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
    onClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleSubmit(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    maxSize: 500000,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <div>
        {uploading ? (
          <button
            disabled
            className="flex w-full gap-4 hover:bg-[#F5F5F5] px-[24px] py-[12px]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
              <path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z"></path>
            </svg>
            <h4
              className={`text-[#5F6368] ${fontGoogleSans.className} antialiased`}
            >
              Uploading...
            </h4>
          </button>
        ) : (
          <button
            onClick={open}
            className="flex w-full gap-4 hover:bg-[#F5F5F5] px-[24px] py-[12px]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
              <path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z"></path>
            </svg>
            <h4
              className={`text-[#5F6368] ${fontGoogleSans.className} antialiased`}
            >
              Computer
            </h4>
          </button>
        )}
      </div>
    </div>
  );
}
