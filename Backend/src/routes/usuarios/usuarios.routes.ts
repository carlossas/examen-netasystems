import express from 'express';
import jwt from 'express-jwt';
import { obtenerUsuarios, insertarUsuario, inicioSesion, editarUsuario, eliminarUsuario, verificarToken } from '../../middlewares/usuarios/usuarios.mw';
export const UsuariosRouter = express.Router();

//POST
UsuariosRouter.post('/login', inicioSesion );

UsuariosRouter.post('/usuarios/crear',jwt({
    secret: <string>process.env.SECRET,
}), insertarUsuario);

UsuariosRouter.post('/verificar-token',
jwt({
    secret: <string>process.env.SECRET,
}), verificarToken);

UsuariosRouter.post('/usuarios/eliminar', jwt({
    secret: <string>process.env.SECRET,
}), eliminarUsuario);


//GET
UsuariosRouter.get('/usuarios/obtener', jwt({
    secret: <string>process.env.SECRET,
}), obtenerUsuarios);

//PUT
UsuariosRouter.put('/usuarios/editar', jwt({
    secret: <string>process.env.SECRET,
}), editarUsuario);




   


