export interface RespuestaServidor {
    error: boolean; //Devuelve True si existe un error en la peticion o un False si todo se realiza correctamente
    data: Array<any> | Object | String | any; //La informacion o data de lo que sea que devuelva la api
    msg: string; //Mensajes personalizados para el usuario
}