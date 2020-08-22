"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosController = void 0;
const conexion_1 = __importDefault(require("../../db/conexion"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UsuariosController {
    constructor() {
    }
    ///////////////////////CRUD USUARIOS
    static obtenerUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            let consulta = `
            SELECT * FROM usuarios
        `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let usuarios = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                    return reject(e);
                });
                let promises = [];
                usuarios.forEach((usuario) => {
                    promises.push(this.obtenerUsuarioCreador(usuario));
                });
                let result = yield Promise.all(promises);
                return resolve({
                    error: false,
                    msg: "La consulta se realizó exitosamente",
                    data: result
                });
            }));
        });
    }
    static insertarUsuario(usuario, token) {
        return __awaiter(this, void 0, void 0, function* () {
            usuario.password = yield this.encriptarContrasena(usuario.password);
            let consulta = `
            INSERT INTO usuarios
            (id, user, password, admin, id_register, language, email, position, telephone, name) 
            VALUES (NULL, 
                '${usuario.user}', 
                '${usuario.password}', 
                ${usuario.admin}, 
                ${token.usuario.id}, 
                '${usuario.language}', 
                '${usuario.email}', 
                '${usuario.position}', 
                ${usuario.telephone},
                '${usuario.name}'
                )
        `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let nuevo_usuario = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                    return reject(e);
                });
                return resolve({
                    error: false,
                    msg: "La consulta se realizó exitosamente",
                    data: nuevo_usuario
                });
            }));
        });
    }
    static editarUsuario(usuario, cambiarPass) {
        return __awaiter(this, void 0, void 0, function* () {
            var consulta = `
            UPDATE usuarios SET 
            user = '${usuario.user}', 
            admin = ${usuario.admin},
            language = '${usuario.language}',
            email = '${usuario.email}',
            position = '${usuario.position}',
            telephone = ${usuario.telephone},
            name = '${usuario.name}'
            WHERE id = ${usuario.id}
        `;
            //Si desea cambiar la contraseña
            if (cambiarPass) {
                let password = yield this.encriptarContrasena(usuario.password);
                consulta = `
                UPDATE usuarios SET 
                user = '${usuario.user}', 
                password = '${password}',
                admin = ${usuario.admin},
                language = '${usuario.language}',
                email = '${usuario.email}',
                position = '${usuario.position}',
                telephone = ${usuario.telephone},
                name = '${usuario.name}'
                WHERE id = ${usuario.id}
            `;
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let res = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                    return reject(e);
                });
                return resolve({
                    error: false,
                    msg: "La consulta se realizó exitosamente",
                    data: res
                });
            }));
        });
    }
    static eliminarUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let consulta = `
            DELETE FROM usuarios WHERE id = ${id}
        `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let res = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                    return reject(e);
                });
                return resolve({
                    error: false,
                    msg: "La consulta se realizó exitosamente",
                    data: res
                });
            }));
        });
    }
    //VALIDACIN DE USUARIO LOGIN
    static ValidarUsuario(user, password) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let consulta = `
                    SELECT * FROM usuarios WHERE user = '${user}'
                `;
            let usuario_db = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                return reject(e);
            });
            if (usuario_db.length == 0) {
                return resolve({
                    msg: "El usuario no existe.",
                    error: true,
                    data: null
                });
            }
            usuario_db = usuario_db[0];
            bcrypt_1.default.compare(password, usuario_db.password).then(valido => {
                delete usuario_db.password;
                if (valido) {
                    return resolve({
                        msg: "Usuario valido",
                        error: false,
                        data: usuario_db
                    });
                }
                else {
                    return resolve({
                        msg: "Credenciales incorrectas.",
                        error: true,
                        data: null
                    });
                }
            }).catch(e => {
                return resolve({
                    msg: "Credenciales incorrectas.",
                    error: true,
                    data: null
                });
            });
        }));
    }
    //FUNCTIONS
    static obtenerUsuarioCreador(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let consulta = `
            SELECT * FROM usuarios WHERE id = ${usuario.id_register}
       `;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let register = yield conexion_1.default.ejecutarConsulta(consulta).catch(e => {
                    return reject(e);
                });
                usuario.user_register = register[0];
                usuario.password = "";
                return resolve(usuario);
            }));
        });
    }
    //TOOLS FUNCTIONS
    static encriptarContrasena(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                bcrypt_1.default.hash(password, 10).then(hash => {
                    resolve(hash);
                }).catch(e => {
                    console.log("Ocurrió un error durante la encriptacion", e);
                    reject({
                        error: true,
                        msg: "Ocurrió un error durante la encripcation",
                        data: e
                    });
                });
            });
        });
    }
}
exports.UsuariosController = UsuariosController;
