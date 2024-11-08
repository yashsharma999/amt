import React, { useEffect, useState } from 'react';
import ResultBox, { roboto } from './ResultBox';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Shimmers from '../common/Shimmers';

export default function Results() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('q');
  const croppedImgUrl = searchParams.get('croppedImg');
  const [scraping, setScraping] = useState(true);
  const [data, setData] = useState([]);

  const getData = async (url) => {
    try {
      setScraping(true);
      const resp = await fetch(`/api/scrapeGod?imageUrl=${url}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('err', error);
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (imageUrl || croppedImgUrl) {
        // agar croppedImg hai toh uspe scrape karna hai
        const data = await getData(croppedImgUrl ? croppedImgUrl : imageUrl);
        setData(data?.results ?? []);
      }
    })();
  }, [searchParams]);

  return (
    <div className="relative max-h-full h-full grid grid-cols-3 p-6 gap-4 overflow-y-scroll">
      {scraping ? (
        <div className="col-span-3">
          <Shimmers />
        </div>
      ) : data?.length > 0 ? (
        <>
          <Column data={data.slice(0, 9)} />
          <Column data={data.slice(9, 18)} />
          <Column data={data.slice(18, 27)} />
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src={'/no-result-google-1.svg'}
            height={200}
            width={200}
            alt="no-result"
          />
          <p className={`${roboto.className} text-[#5f6368] pt-4`}>
            No result for the selected area
          </p>
        </div>
      )}
    </div>
  );
}

const Column = ({ data }) => {
  return (
    <div className="h-full flex flex-col gap-2">
      {data?.map((item, i) => (
        <ResultBox
          key={i}
          img={item.imageSrc}
          link={item.hyperLink}
          desc={item.descriptionText}
          srcImg={item.sourceImg}
          srcTitle={item.sourceTitle}
        />
      ))}
    </div>
  );
};
