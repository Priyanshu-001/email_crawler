document.body.style.backgroundColor = "pink";
document.body.innerHTML="";
const overlay  = document.createElement('div');
overlay.classList.add("radar-overlay")

const heading = document.createElement('h1');
heading.style.color = 'green';
heading.textContent = "Searching for EMAILS on this site";
overlay.appendChild(heading);

const radar = document.createElement('div');
radar.classList.add('radar');
overlay.appendChild(radar)

const sweep = document.createElement('div');
sweep.classList.add('sweep')
radar.appendChild(sweep)

const emailsFound = document.createElement('div')
emailsFound.classList.add('emailList')
overlay.appendChild(emailsFound)

document.body.appendChild(overlay)  






