const { log } = require('node:console')
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 }, ()=>{
    console.log('server runing on port 8080');
    
})