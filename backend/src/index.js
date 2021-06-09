const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var server = require('http').Server(app); 
var io = require('socket.io')(server); 

require('./database');

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sockets
var logueos = [{ 
    email: "paola@gmail.com", 
    date: "hola :]" 
}]; 
app.use(express.static('src/sockets/')); 
io.on('connection', function(socket) { 
    console.log('Alguien se ha conectado con Sockets');   
    socket.emit('logueos', logueos); 
    socket.on('new-logueo', function(data) { 
      logueos.push(data); 
      io.sockets.emit('logueos', logueos); 
    }); 
}); 

// routes
app.use('/api', require('./routes/index'));

// a partir de aqui las rutas llevan token
app.use('/api', require('./routes/rutas'));
app.use('/api', require('./routes/rutasApis'));

// app.listen(app.get('port'));
// console.log('Server on port', app.get('port'));

server.listen(app.get('port'), function() { 
    console.log("Servidor corriendo en http://localhost:4000");  
});
