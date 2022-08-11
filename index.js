const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const socketIo = require('socket.io');

app.use(cors())

//? modifique 
//* forma de ler JSON / middlewares
app.use(express.urlencoded({
    extended: true,
}), )
app.use(express.json())


//* Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/', personRoutes)

// *----
app.use('/grupo1', express.static(path.join(__dirname, 'public')))
app.use('/grupo2', express.static(path.join(__dirname, 'public')))


const server = app.listen(3300, () => {
    console.log("Running")
})

const messages = {
    grupo1: [],
    grupo2: []
}

const io = socketIo(server);

const grupo1 = io.of('/grupo1').on('connection', (socket) => {
    console.log('new connection')
    socket.emit('update_messages', messages.grupo1)

    socket.on('new_message', (data) => {
        messages.grupo1.push(data)
        console.log("messages", messages)
        grupo1.emit('update_messages', messages.grupo1)
    })
})

const grupo2 = io.of('/grupo2').on('connection', (socket) => {
    console.log('new connection')
    socket.emit('update_messages', messages.grupo2)

    socket.on('new_message', (data) => {
        messages.grupo2.push(data)
        console.log(messages)
        grupo2.emit('update_messages', messages.grupo2)
    })
})
// *----



////////////////////////////////////////



//* rota inicial / endpoint
app.get('/', (req, res) => {
    //* mostrar req

    res.json({
        message: "Oi Express!"
    })
})

//* entregar uma porta
const DBname = "bancodochat";
const DB_SERVER = "localhost";

mongoose
    .connect(
        `mongodb://${DB_SERVER}/${DBname}`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))