const JWT = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        JWT.sign(payload, process.env.JWT_KEY, {
            expiresIn: '8h',
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}