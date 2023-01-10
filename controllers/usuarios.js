const { response } = require('express');
const Usuario = require('../models/usuario');

const getusuarios = async (req, resp = Response) => {
    const desde = Number(req.query.desde) || 0 ;

    const usuarios = await Usuario
    .find({_id: {$ne: req.uid}})
    .sort('-online')
    .skip(desde)
    .limit(20)

    resp.json({
        ok: true,
        usuarios: usuarios
    });
 }

module.exports = {
    getusuarios
}