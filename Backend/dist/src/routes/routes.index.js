"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesAPI = void 0;
const usuario_index_1 = require("./usuarios/usuario.index");
//Main Router
exports.routesAPI = [];
exports.routesAPI = exports.routesAPI.concat(usuario_index_1.UsuariosRoutesIndex);
