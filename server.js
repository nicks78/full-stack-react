const express = require("express")();
const apiRouter = require('./api');
const cors = require('cors')
const bodyParser = require("body-parser");

// const server = require('http').Server(express);
// const io = require('socket.io')(server);

express.use(cors())
// parse application/x-www-form-urlencoded 
express.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
express.use(bodyParser.json())
// express.use(express.static('./client/public'));

express.use('/api', apiRouter);

express.listen(8080, (req, res) => {
    console.log('listen to port 8080')
});

// io.sockets.on('connection', function ( socket ) {
//     console.log('socket server' + socket.id)
//     // socket.disconnect();
// });

