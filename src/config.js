const mb = require('./mongodb')

module.exports= {
    port: 443,
    keyPath : process.env.key || '/etc/letsencrypt/live/points884.com/privkey.pem',
    fullChain : process.env.fullchain || '/etc/letsencrypt/live/points884.com/fullchain.pem',
    find : mb.findExisiting,
    update : mb.updateRecord,
    addUnique : mb.addRecordUnqiue
}

