const crypto = require("crypto");
const webpush = require("web-push");
const fs = require('fs')
const config = require('./config')
const add = config.addUnique
const find = config.find
const vapidKeys = {
    privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
    publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
};

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);


function createHash(json){
    return crypto.createHash('md5').update(json).digest("hex");
}


function handlePushNotificationSubscription({body, res}) {
    const subscriptionRequest = body
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    let id = {susbscriptionId}
    res.statusCode = 200
    add(id, JSON.parse(subscriptionRequest))
    getSubscriptions ()
}

async  function getSubscriptions () {
    let data =  await find({})
    let keysHash = {}
    let k = ['susbscriptionId']
        .forEach(e => keysHash[e] = e )
    let keys =Object.values(data).map(e => Object.keys(e))
    let keysFlattened = new Set([].concat.apply([],keys).filter(e => e in keysHash))
    let dataObj = []
    keysFlattened.forEach(key => {
        dataObj = data.filter(e => e[key])
    })
   return dataObj.map(e => {
        delete e._id
        delete e.susbscriptionId
        return e
   })
}

async function sendPushNotification({title,text, tag}) {
    let str = await getSubscriptions ()
    str.forEach(sub => {
        try{
            webpush
                .sendNotification(
                    sub,
                    JSON.stringify({
                        title: title,
                        text : text,
                        tag: tag,
                        url: "https:/points884.com"
                    })
                )
                .catch(err => {
                    console.log(err);
                });
        }

        catch (e) {

        }


    })



}


module.exports = {sendPushNotification, handlePushNotificationSubscription}
