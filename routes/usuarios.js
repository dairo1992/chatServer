/*
path: api/usuarios
*/
const { Router } = require('express');
const { validarJWT } = require('./validar-jwt');
const { getusuarios } = require('../controllers/usuarios');


const router = Router();

// 
router.get('/', validarJWT, getusuarios);

module.exports = router;