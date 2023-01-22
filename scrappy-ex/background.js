
 async function searchEmails(url){
 const res = await fetch('http://localhost:5050/scan',{
    method: 'POST',
    body: JSON.stringify({ link: url }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    const {emailsFound} = await res.json();
    return emailsFound;

}
function addEmailLines(emailList){
  
  return `document.querySelector('h1').textContent="Found ${emailList.length} Emails";` +
  `document.querySelector('.radar').remove();`
  +
  `document.querySelector('.emailList').innerHTML="${emailList}";`

}
chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    chrome.tabs.executeScript({
      file: 'inject.js'
    });
    const emailsFound =  await searchEmails(request)
    const lines = addEmailLines(emailsFound)
    chrome.tabs.executeScript({
      code: lines
    });
      
    return true;
  }
);