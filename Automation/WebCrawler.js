const  puppeteer  = require("puppeteer");
const robotsParser = require('robots-txt-parser')
const robots = robotsParser()


async function explore(startingLInk,counter=20,disallowed=new Set()){
    let visited = new Set();
    let q  = []
    q.push(startingLInk)
    await robots.useRobotsFor(startingLInk)

    const browser = await puppeteer.launch({headless: false});
    allMails = new Set()
    while(q.length !== 0 && counter>0 )
    {   
        let page = await browser.newPage();
        let site = q[0];
        q.shift()

       
        visited.add(site);
        try{
          await page.goto(site);
          console.log('visitng '+site)
          if(!robots.canCrawlSync(site))
          { console.log('Aborted scanning ', site, 'as requeted by site admin')
            continue;
          }

        }
        catch(err)
        {
            console.log('Cannot visit ',site)
            continue;

        }

        let mails = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="mailto:"] '), element => element.href.split(':')[1]));
        let links = await page.evaluate(() => Array.from(document.querySelectorAll('a:not([href^="mailto"])'), element => element.href));

       links.forEach(function(link){
        if(!visited.has(link) && isValidUrl(link))
        {
            q.push(link)
        }
       });

       mails.forEach(mail=>allMails.add(mail))
       counter-=1;
    }
    browser.close()
    return {emailFound: [...allMails]}
}

module.exports = {explore}
explore('https://www.gtbit.org/contact.php',3).then(console.log)

//helper functions
function isValidUrl(link) {
    try {
      new URL(link);
      return true;
    } catch (err) {
      return false;
    }
  }
