const { io } = require('../index');
const { ComprovarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesConectado } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    
    const token = client.handshake.headers['x-token'];
    const [valido, uid] = ComprovarJWT(token);
    // verifica autentificacion
    if (!valido) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado(uid);

    //ingresar usuario a una sala
    // sala global
    client.join(uid);
    
    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', (payload) => {
        console.log("Client: "+uid);
        console.log(payload);
    });

    client.on('disconnect', () => {
        usuarioDesConectado(uid);
    });




});
