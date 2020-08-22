import { Router } from "express";
import { UsuariosRouter } from './usuarios.routes';

export const UsuariosRoutesIndex: Router[] = [
    UsuariosRouter
];