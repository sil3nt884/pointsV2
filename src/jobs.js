let push = require('./push')
let scheduler = require('node-schedule')
const fs = require('fs')

let getCurrentWeek = () =>{
   return fs.readFileSync('currentWeek.txt', 'utf8')
}

let updateWeek = (currentWeek) => {
   fs.writeFileSync('currentWeek.txt', currentWeek)
}


module.exports=  () => {

   let j = scheduler.scheduleJob({hour: 17, minute: 0, dayOfWeek: 1}, async function(){
      await push.sendPushNotification({ title:'Oyster card return now', text:'Return Rickys Oyster', tag:'Oyster'})
   });

   let j2 = scheduler.scheduledJobs({hour: 0, minute: 0, dayOfWeek: 0 }, ()=> {
      let currentWeek = parseInt(getCurrentWeek())
      if(currentWeek <= 2) {
         currentWeek = currentWeek + 1
         updateWeek(currentWeek)
      }
      else {
         currentWeek = 0
         updateWeek(currentWeek)
      }
   })


}
