import { NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function GET(req) {
  const reqUrl = new URL(req.url);

  const imageUrl = reqUrl.searchParams.get('imageUrl');

  const url = `https://lens.google.com/uploadbyurl?url=${imageUrl}`;

  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext();

  try {
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');

    // trying to fix lazy load of image issue
    const sizes = await page.evaluate(() => {
      const browserHeight = window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      return { browserHeight, pageHeight };
    });

    for (let i = 0; i < sizes.pageHeight; i += sizes.browserHeight) {
      await page.mouse.wheel(0, i);
      console.log('scrolled to', i);
      await page.waitForTimeout(1000);
    }
    // trying to fix lazy load of image issue

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
        const imageSrc = await handler.evaluate((node) => {
          const i = node.querySelector('img.wETe9b.jFVN1');
          if (i) {
            return i.src;
          } else {
            return null;
          }
        });

        const hyperLink = await handler.evaluate((node) => {
          const h = node.querySelector('a');
          if (h) {
            return h.href;
          } else {
            return '';
          }
        });

        const descriptionText = await handler.evaluate((node) => {
          const t = node.querySelector('.UAiK1e');
          if (t) {
            return t.textContent;
          } else {
            return '';
          }
        });

        const sourceImg = await handler.evaluate((node) => {
          const n = node.querySelector('img.wETe9b.YRoOie.KRdrw');
          if (n) {
            return n.src;
          } else {
            return null;
          }
        });

        const sourceTitle = await handler.evaluate((node) => {
          const t = node.querySelector('.fjbPGe');
          if (t) {
            return t.textContent;
          } else {
            return '';
          }
        });

        const priceTag = await handler.evaluate((node) => {
          const p = node.querySelector('.DdKZJb');
          if (p) {
            return p.textContent;
          } else {
            return '';
          }
        });

        return {
          imageSrc,
          hyperLink,
          descriptionText,
          sourceImg,
          sourceTitle,
          priceTag,
        };
      } catch (err) {
        console.log('err while scraping', err);
      }
    };

    const results = await Promise.all(
      searchRes.slice(0, 28).map((item) => extractInfo(item))
    );

    return Response.json({
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  } finally {
    browser.close();
    context.close();
  }
}
