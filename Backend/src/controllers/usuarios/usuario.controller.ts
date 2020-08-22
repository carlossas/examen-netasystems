import { Respuesta } from "../../models/respuesta.model";
import moment from "moment";
import { environment } from "../../../environments/environment";
import MySQL from '../../db/conexion';
import { Token } from '../../models/token.model';
import { Usuario } from '../../models/usuario.model';
import bcrypt from 'bcrypt';

export class UsuariosController {

    constructor(){

    }

    ///////////////////////CRUD USUARIOS

    public static async obtenerUsuarios(): Promise<Respuesta>{

        let consulta = `
            SELECT * FROM usuarios
        `;

        return new Promise( async(resolve, reject)=>{
            let usuarios = await MySQL.ejecutarConsulta(consulta).catch( e=>{
                return reject(e)
            });

            let promises: any[] = [];
            
            usuarios.forEach((usuario: Usuario) => {                
                promises.push(this.obtenerUsuarioCreador(usuario));
            });

            let result = await Promise.all(promises);
            
            return resolve ({
                error: false,
                msg: "La consulta se realizó exitosamente",
                data: result
            });
        
        });
    }

    public static async insertarUsuario(usuario: Usuario, token: Token): Promise<Respuesta>{

        usuario.password = await this.encriptarContrasena(usuario.password);

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

        return new Promise( async(resolve, reject)=>{
            let nuevo_usuario = await MySQL.ejecutarConsulta(consulta).catch( e=>{
                return reject(e)
            });
        
            return resolve ({
                error: false,
                msg: "La consulta se realizó exitosamente",
                data: nuevo_usuario
            });
        
        });
    }

    public static async editarUsuario(usuario: Usuario, cambiarPass: boolean): Promise<Respuesta>{

        

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
        if(cambiarPass){
            let password = await this.encriptarContrasena(usuario.password);

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

        return new Promise( async(resolve, reject)=>{
            let res = await MySQL.ejecutarConsulta(consulta).catch( e=>{
                return reject(e)
            });
        
            return resolve ({
                error: false,
                msg: "La consulta se realizó exitosamente",
                data: res
            });
        
        });
    }

    public static async eliminarUsuario(id: number): Promise<Respuesta>{


        let consulta = `
            DELETE FROM usuarios WHERE id = ${id}
        `;

        return new Promise( async(resolve, reject)=>{
            let res = await MySQL.ejecutarConsulta(consulta).catch( e=>{
                return reject(e)
            });
        
            return resolve ({
                error: false,
                msg: "La consulta se realizó exitosamente",
                data: res
            });
        
        });
    }

    //VALIDACIN DE USUARIO LOGIN
    public static ValidarUsuario(user: string, password: string): Promise<Respuesta> {
        return new Promise(async(resolve, reject) => {

                let consulta = `
                    SELECT * FROM usuarios WHERE user = '${user}'
                `;
            
                let usuario_db = await MySQL.ejecutarConsulta(consulta).catch( e=>{
                    return reject(e)
                });
                                

                if(usuario_db.length == 0){
                    return resolve({
                        msg: "El usuario no existe.",
                        error: true,
                        data: null
                    });
                }

                usuario_db = usuario_db[0];

                bcrypt.compare(password, usuario_db.password).then(valido => {

                    delete usuario_db.password;
                    
                    if(valido){
                        return resolve({
                            msg: "Usuario valido",
                            error: false,
                            data: usuario_db
                        });
                    }else{
                        return resolve({
                            msg: "Credenciales incorrectas.",
                            error: true,
                            data: null
                        });
                    }
                   
                }).catch( e=>{
                    return resolve({
                        msg: "Credenciales incorrectas.",
                        error: true,
                        data: null
                    });
                });

        })
    }

    //FUNCTIONS
    public static async obtenerUsuarioCreador(usuario: Usuario): Promise<Usuario>{
        let consulta = `
            SELECT * FROM usuarios WHERE id = ${usuario.id_register}
       `;

       return new Promise( async(resolve, reject)=>{
           let register = await MySQL.ejecutarConsulta(consulta).catch( e=>{
               return reject(e)
           });

           usuario.user_register = register[0];

           usuario.password = "";
           
           
 
                      
           return resolve(usuario);
       
       });
    }


    //TOOLS FUNCTIONS
    static async encriptarContrasena(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10).then(hash => {
                resolve(hash);
            }).catch(e => {
                console.log("Ocurrió un error durante la encriptacion", e);
                reject({
                    error: true,
                    msg: "Ocurrió un error durante la encripcation",
                    data: e
                })
            });
        });
    }






}