const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'points';
const event = require('events')
const e = new event()

const connections = []

let connectToDB = () => {
    return new Promise(resolve => {
        MongoClient.connect(url, function (err, client) {
            console.log(err)
            if (err !== null) ;
            e.emit('connection added', client)
            resolve(client.db(dbName))
        })
    })

}

let db = async ()  =>{
    return connectToDB();
}
let collection = async () => {
    let c = await db()
    return c.collection('points')
}

let findExisiting = (obj) => {
    return new Promise( async resolve => {
        let c = await collection();
        c.find(obj).toArray((err,docs) =>{
                resolve(docs)
        })
    })
}



let updateRecord = async (obj, newobject) =>{
    let c = await collection();
    c.updateOne(obj, {$set: newobject}, (err, result) =>{
        if(result)
        console.log('updated')
    })

}

let deleteRecord =  async  (obj) =>{
    let c = await collection();
     c.deleteOne(obj, (err, result)=>{
        if(result){
            console.log('delete record ' + JSON.stringify(obj))
        }
    })

}

let addRecordUnqiue =  async (obj, newobject) =>{
    let c = await collection()
    c.updateOne(obj, {$set: newobject} ,{upsert : true}, (err, result) =>{
        console.log(err)
        if(result)
            console.log(JSON.stringify(result))
            console.log('updated')
    })
}

let initializeRecord =  async () => {
    let exisit = await findExisiting( {})
    if(exisit <= 0) {
        let c = await collection()
        await c.insertOne({leo: 0, jacob: 0}, (err, result) => {
            console.log('record interested')
        })
    }
    else {
        console.log('record exisit')
    }

}

let createRota = async () => {
    let exisit = await findExisiting( {})
    let keys = Object.values(exisit).map(e => Object.keys(e))
    let rotaExisit = keys.filter(k => k.includes('Kitchen')).length > 0

    if(rotaExisit){
        console.log('rota exist')
    }
    else if(rotaExisit === false) {
        console.log('creating new rota')
        let c = await collection()
         await c.insertMany([{
             "Kitchen": "Jacob",
             "Laundry": "Chloe",
             "Floor": "Ricky",
             "Bathroom": "Chloe"
         },

             {
                 "Kitchen": "Ricky",
                 "Laundry": "Jacob",
                 "Floor": "Chloe",
                 "Bathroom": "Jacob"
             },
             {
                 "Kitchen": "Chloe",
                 "Laundry": "Ricky",
                 "Floor": "Jacob",
                 "Bathroom": "Ricky"
             }
         ], (err, result) => {
             console.log('record interested')
         })
    }

}


let starsInit = () =>{
    return new Promise(async resolve =>  {
        let exisit = await findExisiting( {})
        let keys = Object.values(exisit).map(e => Object.keys(e))
        let starsExisit = keys.filter(k => k.includes('collectedstarts')).length > 0
        if(starsExisit){
            resolve()
        }
        else if(starsExisit === false) {
            let c = await collection()
            await c.insertOne({collectedstarts: 0})
            resolve()
        }
    })
}


let init = [initializeRecord(),createRota(), starsInit()]

Promise.all(init).catch(err =>{
    console.log(err)
})

let delay = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log('timeout')
            resolve()
        }, 1000)
    })
}
let count = 0

e.on('connection added',  async (e) =>{
    connections.push(e)
    console.log(connections.length)
    if(connections.length > 2){
        connections.forEach((e, i) => {
            console.log('closing')
            e.close()
            connections.splice(i)

        })
        e.emit('ended')

    }
})

e.on('ended', ()=>{
    console.log('connection closed')
})

module.exports = {findExisiting, deleteRecord, updateRecord, addRecordUnqiue};
