//import crawler from '@/lib/scrape';
// import { PlaywrightCrawler } from 'crawlee';

let yahaStoreKar = {};

import { runCrawlerWithUrl } from '@/lib/scrape';
// const crawler = new PlaywrightCrawler({
//   // Use the requestHandler to process each of the crawled pages.
//   async requestHandler({ request, page, enqueueLinks, log }) {
//     const title = await page.title();
//     const searchRes = await page.$$('.G19kAf.ENn9pd');

//     const imageSrc = await searchRes[0].evaluate(
//       (node) => node.querySelector('img').src
//     );

//     const hyperLink = await searchRes[0].evaluate(
//       (node) => node.querySelector('a').href
//     );

//     const descriptionText = await searchRes[0].evaluate(
//       (node) => node.querySelector('.UAiK1e').textContent
//     );

//     //source title = fjbPGe
//     //source img = PlAMyb > img
//     const results = {
//       imageSrc,
//       hyperLink,
//       descriptionText,
//     };
//     log.info(`test ${imageSrc} ${hyperLink} ${descriptionText}`);
//     yahaStoreKar = results;
//     // Save results as JSON to ./storage/datasets/default
//     //await Dataset.pushData(results);

//     // Extract links from the current page
//     // and add them to the crawling queue.
//     // await enqueueLinks();
//   },
//   // Uncomment this option to see the browser window.
//   // headless: false,

//   // Let's limit our crawls to make our tests shorter and safer.
//   maxRequestsPerCrawl: 20,
// });

// export async function handler() {
//   //   await crawler.run([
//   //     'https://lens.google.com/uploadbyurl?url=https://nug-test-2.s3.us-east-1.amazonaws.com/81iYmWceZRL._SY695_.jpg',
//   //   ]);

//   console.log('store', yahaStoreKar);
//   return Response.json({ msg: 'hello' });
// }

import { NextResponse } from 'next/server';

export async function GET() {
  runCrawlerWithUrl(
    'https://lens.google.com/uploadbyurl?url=https://nug-test-2.s3.us-east-1.amazonaws.com/81iYmWceZRL._SY695_.jpg'
  );
  return NextResponse.json({ message: 'Hello, world!' });
}
