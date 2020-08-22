import { Request, Response, NextFunction } from 'express';
import { UsuariosController } from '../../controllers/usuarios/usuario.controller';
import { Token } from '../../models/token.model';
import { Usuario } from '../../models/usuario.model';
import jwt from 'jsonwebtoken';
import { Respuesta } from '../../models/respuesta.model';

let tokenProvicional: Token = {
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

export function obtenerUsuarios(req: Request, res: Response, next: NextFunction) {

    UsuariosController.obtenerUsuarios().then(respuesta => {
        res.send(respuesta)
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });

}

export function insertarUsuario(req: Request, res: Response, next: NextFunction) {
    let body = req.body;

    let usuario: Usuario = {
        user: body.user,
        name: body.name,
        password: body.password,
        admin: body.admin,
        email: body.email,
        telephone: body.telephone,
        position: body.position,
        language: body.language
    }

    UsuariosController.insertarUsuario(usuario, tokenProvicional).then(respuesta => {
        res.send(respuesta)
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
    
}

export function editarUsuario(req: Request, res: Response, next: NextFunction) {
    let body = req.body;

    let usuario: Usuario = {
        id: body.id,
        name: body.name,
        user: body.user,
        password: body.password,
        admin: body.admin,
        email: body.email,
        telephone: body.telephone,
        position: body.position,
        language: body.language
    }

    UsuariosController.editarUsuario(usuario, body.cambiarPass || false).then(respuesta => {
        res.send(respuesta)
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
    
}

export function eliminarUsuario(req: Request, res: Response, next: NextFunction) {
    let body = req.body;

    UsuariosController.eliminarUsuario(body.id).then(respuesta => {
        res.send(respuesta)
    }).catch(e => {
        console.error("Ocurrió un error durante la consulta", e);
        res.send(e);
    });
    
}

export function verificarToken(req: Request, res: Response, next: NextFunction) {
    res.send({
        error: false,
        data: null,
        msg: "Token valido."
    });
    
}

export function inicioSesion(req: Request, res: Response, next: Function) {    
    console.log(req.body);
    
    let user: string = req.body.user;
    let password: string = req.body.password;
    let secret = <string>process.env.SECRET;

    UsuariosController.ValidarUsuario(user, password).then(respuesta => {
        if (!respuesta.error) {

            let usuarioToken: Token = {
                usuario: respuesta.data
            }

            usuarioToken.exp = Math.floor(Date.now() / 1000) + ((60 * 60) * 8);//Este campo brinda un tiempo de expiracion al token de 12 horas;

            let usuarioJson = JSON.stringify(usuarioToken)
            let token: string = jwt.sign(usuarioJson, secret);
           
            let respuestaRuta: Respuesta = {
                error: false,
                msg: "Bienvenido, " + usuarioToken.usuario.user,
                data: {
                    usuario: usuarioToken.usuario,
                    token: token
                }
            }

            res.send(respuestaRuta)
            
        } else {
            res.send(respuesta)
        }
    }).catch(e => {
        console.error("Ocurrió un error durante la validacion al inciar sesion", e);
        res.send({
            error: true,
            msg: "Ocurrió un error al inciar session ",
            data: e
        })
    })
}