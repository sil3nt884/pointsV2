let push = require('./push')
let scheduler = require('node-schedule')






export  default () => {

   let j = scheduler.scheduleJob({hour: 17, minute: 0, dayOfWeek: 1}, async function(){
      await push.sendPushNotification({ title:'Oyster card return now', text:'Return Rickys Oyster', tag:'Oyster'})
   });

}
