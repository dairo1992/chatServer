/*
path: api/login
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// check('nombre', 'Nombre debe ser obligatorio').not().isEmpty(),
router.post('/new',
    body('nombre', 'Nombre debe ser obligatorio').not().isEmpty(),
    body('usuario', 'Usuario debe ser obligatorio').not().isEmpty(),
    body('usuario', 'Usuario debe ser correo valido').isEmail(),
    body('password', 'Password debe ser obligatorio').not().isEmpty(),
    validarCampos,
    crearUsuario);

router.post('/',
    body('usuario', 'Usuario debe ser obligatorio').not().isEmpty(),
    body('usuario', 'Usuario debe ser correo valido').isEmail(),
    body('password', 'Password debe ser obligatorio').not().isEmpty(),
    validarCampos,
    login);

// 
// router.get('/renew', validarJWT, renewToken);

module.exports = router;