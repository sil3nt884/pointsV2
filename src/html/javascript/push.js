
let isPushNotificationSupported = "serviceWorker" in navigator && "PushManager" in window;
const pushServerPublicKey = "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";

function initializePushNotifications() {
    return Notification.requestPermission(function(result) {
        return result;
    });
}


function registerServiceWorker() {
    navigator.serviceWorker.register("service-worker.js").then(function(swRegistration) {});
}

function createNotificationSubscription() {
    return navigator.serviceWorker.ready.then(function(serviceWorker) {
        return serviceWorker.pushManager
            .subscribe({
                userVisibleOnly: true,
                applicationServerKey: pushServerPublicKey
            })
            .then(function(subscription) {
                console.log("User is subscribed.", subscription);
                return subscription;
            });
    });
}

function sendSubscriptionToPushServer(userSub) {
    var xhr = new XMLHttpRequest();
    var url = `https://${new URL(window.location.href).host}/subscription`;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify(userSub);
	console.log(data)
    xhr.send(data);
}


function init() {
    if(1){
        initializePushNotifications().then(()=>{
           // registerServiceWorker()
            createNotificationSubscription().then((userSub)=>{
                console.log(userSub)
                sendSubscriptionToPushServer(userSub);
            })
        })
    }else if(isPushNotificationSupported === false){
        alert('push not supported')
    }


}


