const  puppeteer  = require("puppeteer");

async function explore(startingLInk,counter=20,disallowed=new Set()){
    let visited = new Set();
    let q  = []
    q.push(new URL(startingLInk))
    const browser = await puppeteer.launch({headless: false});
    allMails = new Set()
    while(q.length !== 0 && counter>0 )
    {
        let page = await browser.newPage();
        let site = q[0];
        console.log('visitng'+site)
        q.shift()

        visited.add(site);
        try{
            await page.goto(site);
        }
        catch(err)
        {
            
            continue;

        }

        let mails = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="mailto:"]'), element => element.href.split(':')[1]));
        let links = await page.evaluate(() => Array.from(document.querySelectorAll('a:not([href^="mailto"])'), element => element.href));

       links.forEach(function(link){
        if(!visited.has(link) && isValidUrl(link) && !disallowed.has(link))
        {
            q.push(new URL(link))
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
function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
