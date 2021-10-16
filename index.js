const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

require('dotenv').config()
app.use(cors())

const PORT = process.env.PORT || 6000;

const COM_PORT = process.env.COM_PORT;

const SerialPort = require("serialport");
var serial = new SerialPort(COM_PORT, {  
    baudRate: 9600
});

server.listen(PORT, function () {
    console.log('La aplicación esta funcionando en la siguiente direccion: http://0.0.0.0:' + PORT + '!');
});

app.get('/', function (req, res) {

    return res.send('Working');
 
});

serial.on('open',function() {
    console.log('Serial Port ' + COM_PORT + ' is opened.');
});

serial.on('readable', function () {

    let mensaje = serial.read().toString().substring(1)
    console.log(mensaje)

    io.emit("enviar mensaje", {
        "mensaje" : mensaje
    })
})

io.on('connection', (socket) => {
    // console.log('a user connected');
});