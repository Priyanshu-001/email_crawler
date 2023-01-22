

function getTab(...args){
    return new Promise((resolve, reject) => {
       
        chrome.tabs.query(...args, (data, err) => {
          if (err) return reject(err)
          resolve(data)
        })
      })


}

async function scan(){
    const [tab,] = await getTab({active:true})
    const link = tab.url
    const v = await chrome.runtime.sendMessage(link);
    console.log(v)
    
    
    
}


document.addEventListener('DOMContentLoaded', function () {
const scanBtn = document.getElementById('scan')
scanBtn.addEventListener('click',scan)
})