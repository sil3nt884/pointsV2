let push = require('../push')

let  send =  (req, res) =>{
    req.on('data', async (data)=>{
        let j = JSON.parse(String(data))
        let ob = Object.values(j)
        let text = ob[0].value
        let title = ob[1].value
        let tag = ob[2].value
        await push.sendPushNotification({title,text,tag})
    })
    res.send('ok')

}

module.exports =  send
