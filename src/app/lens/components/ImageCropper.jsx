import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function ImageCropper() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const imageUrl = searchParams.get('q');
  const router = useRouter();

  const cropperRef = useRef(null);

  const [image, setImage] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  console.log('img', image);
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
        const params = new URLSearchParams(searchParams.toString());

        params.set('croppedImg', `${url}${fields.key}`);

        router.replace(`${pathname}?${params.toString()}`);
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        alert('Upload failed.');
      }
    } else {
      alert('Failed to get pre-signed URL.');
    }

    setUploading(false);
  };

  // Crop the image and create a new file
  const getCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      // Get the cropped canvas and convert it to Blob
      cropper.getCroppedCanvas().toBlob((blob) => {
        // Convert Blob to File
        const file = new File([blob], 'cropped-image.png', {
          type: 'image/png',
          lastModified: new Date().getTime(),
        });
        setCroppedFile(file); // Store the cropped file in state
        console.log('Cropped File:', file); // Log or use the file as needed
      }, 'image/png');
    }
  };

  useEffect(() => {
    setImage(imageUrl);
  }, [searchParams]);

  useEffect(() => {
    if (!croppedFile) {
      return;
    }
    handleSubmit(croppedFile);
    console.log('send to aws');
  }, [croppedFile]);

  // Toggle cropper state based on `isCropEnabled`
  useEffect(() => {
    const cropper = cropperRef.current?.cropper;

    if (cropper) {
      if (!uploading) {
        cropper.enable();
      } else {
        cropper.disable();
      }
    }
  }, [uploading]);

  return (
    <div className="bg-[#202124] h-full flex flex-col items-center justify-center">
      <div className="max-w-[80%] max-h-[80%] overflow-hidden">
        {image && (
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            guides={true}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
            autoCropArea={1}
            background={false}
            cropend={getCroppedImage}
          />
        )}
      </div>
    </div>
  );
}
