"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_jwt_1 = __importDefault(require("express-jwt"));
const usuarios_mw_1 = require("../../middlewares/usuarios/usuarios.mw");
exports.UsuariosRouter = express_1.default.Router();
//POST
exports.UsuariosRouter.post('/login', usuarios_mw_1.inicioSesion);
exports.UsuariosRouter.post('/usuarios/crear', express_jwt_1.default({
    secret: process.env.SECRET,
}), usuarios_mw_1.insertarUsuario);
exports.UsuariosRouter.post('/verificar-token', express_jwt_1.default({
    secret: process.env.SECRET,
}), usuarios_mw_1.verificarToken);
exports.UsuariosRouter.post('/usuarios/eliminar', express_jwt_1.default({
    secret: process.env.SECRET,
}), usuarios_mw_1.eliminarUsuario);
//GET
exports.UsuariosRouter.get('/usuarios/obtener', express_jwt_1.default({
    secret: process.env.SECRET,
}), usuarios_mw_1.obtenerUsuarios);
//PUT
exports.UsuariosRouter.put('/usuarios/editar', express_jwt_1.default({
    secret: process.env.SECRET,
}), usuarios_mw_1.editarUsuario);
