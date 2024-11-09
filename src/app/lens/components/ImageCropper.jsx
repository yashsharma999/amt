import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import PulsatingElement from './common/PulsatingElement';
import { fontGoogleSans } from './UploadButton';

export default function ImageCropper() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const imageUrl = searchParams.get('q');
  const router = useRouter();

  const cropperRef = useRef(null);

  const [image, setImage] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (file) => {
    try {
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
    } catch (error) {
      console.log('err while uploading file', error);
    } finally {
      setUploading(false);
    }
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
    <div className="relative bg-[#202124] h-full flex flex-col items-center justify-between py-8">
      <button
        className={`flex gap-1 py-[7px] px-4 items-center rounded-full text-[rgba(248_249_250)] hover:bg-[#ffffff0f] border-[1px] border-[#fff3] ${fontGoogleSans.className}`}
      >
        <span>
          <svg
            height="18"
            viewBox="0 0 24 24"
            width="18"
            focusable="false"
            fill="#fff"
          >
            <rect fill="none" height="24" width="24"></rect>
            <path d="M19.3,16.9c0.4-0.7,0.7-1.5,0.7-2.4c0-2.5-2-4.5-4.5-4.5S11,12,11,14.5s2,4.5,4.5,4.5c0.9,0,1.7-0.3,2.4-0.7l3.2,3.2 l1.4-1.4L19.3,16.9z M15.5,17c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5S16.9,17,15.5,17z M12,20v2 C6.48,22,2,17.52,2,12C2,6.48,6.48,2,12,2c4.84,0,8.87,3.44,9.8,8h-2.07c-0.64-2.46-2.4-4.47-4.73-5.41V5c0,1.1-0.9,2-2,2h-2v2 c0,0.55-0.45,1-1,1H8v2h2v3H9l-4.79-4.79C4.08,10.79,4,11.38,4,12C4,16.41,7.59,20,12,20z"></path>
          </svg>
        </span>
        Find image source
      </button>
      <div className="relative max-w-[80%] max-h-[80%] overflow-hidden">
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
        <>
          {uploading &&
            Array.from({ length: 15 }).map((item, i) => (
              <PulsatingElement key={i} />
            ))}
        </>
      </div>
      <div
        className={`flex gap-8 rounded-full tracking-wider items-center bg-[#383B3F] text-sm text-[#c1c1c1] ${fontGoogleSans.className}`}
      >
        <div className="bg-white rounded-full py-[6px] px-4 text-[#383B3F] ">
          Search
        </div>
        <div>Text</div>
        <div className="py-[6px] px-4 ">Translate</div>
      </div>
    </div>
  );
}
