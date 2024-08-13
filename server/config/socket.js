const socketIo = require('socket.io');

const io = socketIo();
const socketApi = {};


socketApi.io = io;

socketApi.io.on('connection', function(client){
    client.on('typing', (data)=>{

    });

    client.on('connect', ()=>{

    });

    client.on('message', (data)=>{
        io.emit('message', data);
    });

    client.on('location',(data)=>{

    })
    
    client.on('disconnect', ()=>{

    });

    client.on('error', function(err){

    })

})



module.exports = socketApi;