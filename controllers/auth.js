const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req, res = response) => {
    const user = req.body;

    try {
        const existUsuario = await Usuario.findOne(user);
        if (existUsuario) {
            return res.status(400).json({
                ok: false,
                msg: "Este usuario ya existe"
            });
        }
        const usuario = new Usuario(req.body);
        //Encryptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(usuario.password, salt);
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);
        console.log(token);

        res.json({
            ok: true,
            msg: usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Comuniquese con el administrador" });
    }
}

const login = async (req, res = response) => {
    const { usuario, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ usuario });
        if (!usuarioDB) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        //Validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
        }

        //Generar JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            msg: usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Comuniquese con el administrador" });
    }
}

const renewToken = async (req, res) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuarioDB = await Usuario.findById(uid);
    

    res.json({
        ok: true,
        msg: usuarioDB.usuario,
        token
    });
    // res.json({
    //     ok: true,
    //     uid: req.uid
    // })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}