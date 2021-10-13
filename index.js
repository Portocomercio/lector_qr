const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 6000;

const COM_PORT = process.env.COM_PORT;

const SerialPort = require("serialport");
var serial = new SerialPort(COM_PORT, {  
    baudRate: 9600
});

app.listen(PORT, function () {
    console.log('La aplicación esta funcionando en la siguiente direccion: http://0.0.0.0:' + PORT + '!');
});

serial.on('open',function() {
    console.log('Serial Port ' + COM_PORT + ' is opened.');
});

serial.on('readable', function () {
    console.log('Data:', serial.read().toString().substring(1))
})