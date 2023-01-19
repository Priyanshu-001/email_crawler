const  puppeteer  = require("puppeteer");


async function  findEmailFromPage(site){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(site);

    const mails = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="mailto:"]'), element => element.href.split(':')[1]));
    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a:not([href^="mailto"])'), element => element.href));
    
    browser.close()
    return {mails,links}

}
findEmailFromPage('https://predictor-jee.netlify.app/').then(console.log)