import { chromium } from 'playwright';

export async function GET(req) {
  const reqUrl = new URL(req.url);

  const imageUrl = reqUrl.searchParams.get('imageUrl');

  const url = `https://lens.google.com/uploadbyurl?url=${imageUrl}`;

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  await page.waitForLoadState('domcontentloaded');

  const searchRes = await page.$$('.G19kAf.ENn9pd');

  const extractInfo = async (handler) => {
    const imageSrc = await handler.evaluate(
      (node) => node.querySelector('img.wETe9b.jFVN1').src
    );

    const hyperLink = await handler.evaluate(
      (node) => node.querySelector('a').href
    );

    const descriptionText = await handler.evaluate(
      (node) => node.querySelector('.UAiK1e').textContent
    );

    return {
      imageSrc,
      hyperLink,
      descriptionText,
    };
  };

  const results = await Promise.all(
    searchRes.slice(0, 20).map((item) => extractInfo(item))
  );

  return Response.json({
    results,
  });
}
