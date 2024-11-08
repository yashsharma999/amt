import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageDropzoneScreen({ onClose }) {
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

      <div className="fixed bg-transparent top-[62px] left-0 h-screen z-30 w-screen">
        {isDragActive ? (
          <div className="bg-white h-full w-full flex flex-col justify-center items-center">
            <div className="border flex flex-col justify-center items-center h-[70%] w-[90%] border-dashed rounded-[12px]">
              <Image
                src={'/dragImage.png'}
                height={300}
                width={500}
                alt="placeholderimg"
              />
              <p className="text-lg text-[#5F6368] mt-8">
                To search, drag an image anywhere
              </p>
            </div>
          </div>
        ) : uploading ? (
          <div className="bg-white h-full w-full flex flex-col justify-center items-center">
            <div className="border flex flex-col justify-center items-center h-[70%] w-[90%] border-dashed rounded-[12px]">
              <Image
                src={'/dragImage.png'}
                height={300}
                width={500}
                alt="placeholderimg"
              />
              <p className="text-lg text-[#5F6368] mt-8">Uploading...</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
