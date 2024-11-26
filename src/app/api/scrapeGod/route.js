import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

import puppeteer from 'puppeteer';

export async function GET(req) {
  const reqUrl = new URL(req.url);
  const imageUrl = reqUrl.searchParams.get('imageUrl');
  const url = `https://lens.google.com/uploadbyurl?url=${imageUrl}`;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const context = await browser.createBrowserContext();

  try {
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Fixing lazy loading of images
    // const sizes = await page.evaluate(() => {
    //   const browserHeight = window.innerHeight;
    //   const pageHeight = document.body.scrollHeight;

    //   return { browserHeight, pageHeight };
    // });

    // for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
    //   await page.evaluate((scrollStep) => {
    //     window.scrollBy(0, scrollStep);
    //   }, sizes.browserHeight);
    //   console.log('scrolled to', i);
    //   await page.waitForTimeout(1000);
    // }

    // Selectors are slightly adjusted for Puppeteer
    const searchRes = await page.$$('.G19kAf.ENn9pd');

    const extractInfo = async (handler) => {
      try {
        if (!handler) {
          return {
            imageSrc: null,
            hyperLink: '',
            descriptionText: '',
            sourceImg: null,
            priceTag: '',
          };
        }

        const imageSrc = await handler
          .$eval('img.wETe9b.jFVN1', (img) => img.src)
          .catch(() => null);
        const hyperLink = await handler
          .$eval('a', (a) => a.href)
          .catch(() => '');
        const descriptionText = await handler
          .$eval('.UAiK1e', (el) => el.textContent)
          .catch(() => '');
        const sourceImg = await handler
          .$eval('img.wETe9b.YRoOie.KRdrw', (img) => img.src)
          .catch(() => null);
        const sourceTitle = await handler
          .$eval('.fjbPGe', (el) => el.textContent)
          .catch(() => '');
        const priceTag = await handler
          .$eval('.DdKZJb', (el) => el.textContent)
          .catch(() => '');

        return {
          imageSrc,
          hyperLink,
          descriptionText,
          sourceImg,
          sourceTitle,
          priceTag,
        };
      } catch (err) {
        console.log('Error while scraping:', err);
      }
    };

    const results = await Promise.all(
      searchRes.slice(0, 28).map((item) => extractInfo(item))
    );

    return new Response(JSON.stringify({ results }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
    });
  } finally {
    await browser.close();
  }
}
