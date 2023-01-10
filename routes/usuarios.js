/*
path: api/usuarios
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { getusuarios } = require('../controllers/usuarios');


const router = Router();

// 
router.get('/', validarJWT, getusuarios);

module.exports = router;