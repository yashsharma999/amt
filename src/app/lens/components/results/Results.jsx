import React, { useEffect, useState } from 'react';
import ResultBox from './ResultBox';
import { useSearchParams } from 'next/navigation';

export default function Results() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('q');
  const croppedImgUrl = searchParams.get('croppedImg');
  const [scraping, setScraping] = useState(false);
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
    <div className="max-h-full grid grid-cols-3 p-6 gap-4 overflow-y-scroll">
      {scraping ? (
        <div>{`please wait, getting data...`}</div>
      ) : (
        data?.map((item, i) => (
          <ResultBox
            key={i}
            img={item.imageSrc}
            link={item.hyperLink}
            desc={item.descriptionText}
          />
        ))
      )}
    </div>
  );
}
