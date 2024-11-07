import { gotScraping } from 'got-scraping';

// Get the HTML of a web page
const { body } = await gotScraping({
  url: 'https://lens.google.com/uploadbyurl?url=https://nug-test-2.s3.us-east-1.amazonaws.com/81iYmWceZRL._SY695_.jpg',
});
console.log(body);
