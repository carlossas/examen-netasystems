import { Usuario } from './usuario.model';
export interface Token {
    usuario: Usuario;
    exp?: number
}