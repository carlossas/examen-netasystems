import { Router } from "express";
import { UsuariosRoutesIndex } from './usuarios/usuario.index';


//Main Router
export let routesAPI: Router[] = [

];

routesAPI = routesAPI.concat(
    
    UsuariosRoutesIndex,

);
