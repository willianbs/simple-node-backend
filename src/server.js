const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-kbaqj.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

const app = express();

app.use(cors()); //just cause :)

const server = require('http').Server(app); //troca para poder receber requests de WS ou HTTP
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('socket connected:', socket);
    socket.on('connectRoom', box => { //entra na 'sala' com ID do BOX (pasta), para que somente quem tem acesso a ela receba
        socket.join(box);
    })
});

//middleware pra adicionar a key 'IO' em todas as requests
app.use((req, res, next) => {
    req.io = io;
    return next(); //processa e continua
});

app.use(express.json()); //formato de dados
app.use(express.urlencoded({
    extended: true
})); //upload e etc
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use('/api', require('./routes')); //rotas

server.listen(3333);
