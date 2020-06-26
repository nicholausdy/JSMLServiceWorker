const NATS = require('nats')
const topic = "notification"
const url = "nats://192.168.1.105:4222"


async function natsConsumer(){
    try {
        const msg = await consume(topic,url)
    }
    catch (e) {
        console.log(e)
    }

    async function consume(topic, url) {
        return new Promise((resolve, reject) => {
            const nc = NATS.connect({
                url:url
            })  
            //event handlers
            nc.subscribe(topic, async function(msg){
                if (msg) {
                    await actionSelector(msg)
                    return resolve(msg)
                }
                else {
                    data = {message:"Error encountered during connection with NATS"}
                    return reject(data)
                }
            }) 
            nc.on('connect', (nc) => {
                console.log(`Connected to ${nc.currentServer.url.host}`)
            })
            nc.on('error', (err) => {
                return reject({Error: err.name, Message: err.message, Code: err.chainedError.code, Address: err.chainedError.address, Port: err.chainedError.port})
            })        
        })
    }

    // define action when receiving message here
    async function actionSelector(msg){
        console.log(msg); //in production change to refresh data from database with fetch from node
    }    
}

natsConsumer()


