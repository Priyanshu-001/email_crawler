const puppeteer = require('puppeteer');

async function getEmails(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

 
  const pageText = await page.evaluate(() => document.body.innerText);


  const emailRegex = /\S+@\S+\.\S+/g;
  const emails = pageText.match(emailRegex);

  await browser.close();

  return emails;
}

getEmails('https://example.com').then(console.log);