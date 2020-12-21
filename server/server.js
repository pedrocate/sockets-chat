const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

const path = require('path');
const Usuario = require('./models/usuario');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


// ESTA PARTE LA HE METIDO PARA IR PRACTICANDO
app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El email no existe'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Contraseña incorrecta'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });
})


mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});




server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});