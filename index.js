const express = require('express')
const app = express();
const {explore} = require('./Automation/WebCrawler')
app.use(express.json())
app.post('/scan',async (req,res)=>{
    console.log(req)

    const {link} = req.body
    if(!link) // link is required
        return res.json({emailsFound:400})
    return explore(link,2).then(result=>res.json(result))
})
app.get('*',(req,res)=>{
    console.log()
    return res.send('Hello')    
})


app.listen(5050,()=>console.log('Hu'))