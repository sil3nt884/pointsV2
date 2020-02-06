let push = require('../push')


let sub = (req, res) =>{
    let body= ''
    req.on('data',data => {
        console.log(String(data))
        if(data !== undefined) {
            body += String(data)
        }
    })
    req.on('close', ()=>{
        console.log('close')
	if(body !== ''){
       		 push.handlePushNotificationSubscription({body, res})
	}
    })
    res.send('ok')
}


module.exports = sub
