"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_controller_1 = require("../../controllers/usuarios/usuario.controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let tokenProvicional = {
    exp: 4000,
    usuario: {
        id: 1,
        name: "Admin",
        user: "admin",
        password: "1234a",
        admin: true,
        id_register: 1,
        language: "es",
        email: "carloss_dev@hotmail.com",
        position: "Administrador",
        telephone: 9931366047
    }
};
function obtenerUsuarios(req, res, next) {
    usuario_controller_1.UsuariosController.obtenerUsuarios().then(respuesta => {
        res.send(respuesta);
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
}
exports.obtenerUsuarios = obtenerUsuarios;
function insertarUsuario(req, res, next) {
    let body = req.body;
    let usuario = {
        user: body.user,
        name: body.name,
        password: body.password,
        admin: body.admin,
        email: body.email,
        telephone: body.telephone,
        position: body.position,
        language: body.language
    };
    usuario_controller_1.UsuariosController.insertarUsuario(usuario, tokenProvicional).then(respuesta => {
        res.send(respuesta);
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
}
exports.insertarUsuario = insertarUsuario;
function editarUsuario(req, res, next) {
    let body = req.body;
    let usuario = {
        id: body.id,
        name: body.name,
        user: body.user,
        password: body.password,
        admin: body.admin,
        email: body.email,
        telephone: body.telephone,
        position: body.position,
        language: body.language
    };
    usuario_controller_1.UsuariosController.editarUsuario(usuario, body.cambiarPass || false).then(respuesta => {
        res.send(respuesta);
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
}
exports.editarUsuario = editarUsuario;
function eliminarUsuario(req, res, next) {
    let body = req.body;
    usuario_controller_1.UsuariosController.eliminarUsuario(body.id).then(respuesta => {
        res.send(respuesta);
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
}
exports.eliminarUsuario = eliminarUsuario;
function verificarToken(req, res, next) {
    res.send({
        error: false,
        data: null,
        msg: "Token valido."
    });
}
exports.verificarToken = verificarToken;
function inicioSesion(req, res, next) {
    console.log(req.body);
    let user = req.body.user;
    let password = req.body.password;
    let secret = process.env.SECRET;
    usuario_controller_1.UsuariosController.ValidarUsuario(user, password).then(respuesta => {
        if (!respuesta.error) {
            let usuarioToken = {
                usuario: respuesta.data
            };
            usuarioToken.exp = Math.floor(Date.now() / 1000) + ((60 * 60) * 8); //Este campo brinda un tiempo de expiracion al token de 12 horas;
            let usuarioJson = JSON.stringify(usuarioToken);
            let token = jsonwebtoken_1.default.sign(usuarioJson, secret);
            let respuestaRuta = {
                error: false,
                msg: "Bienvenido, " + usuarioToken.usuario.user,
                data: {
                    usuario: usuarioToken.usuario,
                    token: token
                }
            };
            res.send(respuestaRuta);
        }
        else {
            res.send(respuesta);
        }
    }).catch(e => {
        console.error("Ocurrió un error durante la validacion al inciar sesion", e);
        res.send({
            error: true,
            msg: "Ocurrió un error al inciar session ",
            data: e
        });
    });
}
exports.inicioSesion = inicioSesion;
