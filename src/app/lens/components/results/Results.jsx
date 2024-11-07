import React, { useEffect, useState } from 'react';
import ResultBox from './ResultBox';
import { useSearchParams } from 'next/navigation';

export default function Results() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('q');

  const [data, setData] = useState([]);

  const getData = async (url) => {
    try {
      const resp = await fetch(`/api/scrapeGod?imageUrl=${url}`);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const data = await getData(imageUrl);
        setData(data?.results ?? []);
      }
    })();
  }, [searchParams]);

  return (
    <div className="max-h-full grid grid-cols-3 p-6 gap-4 overflow-y-scroll">
      {data?.map((item, i) => (
        <ResultBox
          key={i}
          img={item.imageSrc}
          link={item.hyperLink}
          desc={item.descriptionText}
        />
      ))}
    </div>
  );
}
