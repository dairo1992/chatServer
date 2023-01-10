/*
path: api/usuarios
*/
const { Router } = require('express');
const  validarJWT  = require('../middlewares/validar-jwt');
const { getusuarios } = require('../controllers/usuarios');


const router = Router();

// 
router.get('/', validarJWT, getusuarios);
console.log(1);

module.exports = router;