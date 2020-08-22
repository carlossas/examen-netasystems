import { environment } from '../../environments/environment';
import { LOG } from '../util/ownlog';
import mysql = require ('mysql');

export default class MySQL{

    private static _instance: MySQL;

    conexion: mysql.Connection;
    conectado: boolean = false;

    constructor(){

        this.conexion = mysql.createConnection(environment.database);
        this.validarConexion();

    }

    //GENERA UNA INSTANCIA DE LA CLASE, Y SI NO EXISTE CREA UNA NUEVA
    //PATRON SINGLETON
    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    //EJECUTA UNA CONSULTA
    static ejecutarConsulta( query: string): Promise<any>{

        return new Promise ( (resolve, reject)=>{

            this.instance.conexion.query( query, (err, results: Object[], fields)=>{
                //SI ENCONTRAMOS UN ERROR DE SINTAXIS
                if(err){
                    console.log("Error al ejecutar consulta", err);
                    return reject(err);
                }
                //SI EL DATO BUSCADO NO EXISTE
                if(results.length === 0){
                    LOG("El registro no existe en la bd")
                    resolve([]);
                }else{
                    //TODO SALIO BIEN
                    resolve(results);
                }
    
            });

        })
        

    }

    //VALIDAMOS LA CONEXION Y SI ES CORRECTA, ENTRAMOS
    private validarConexion(){

        this.conexion.connect( (error: mysql.MysqlError)=>{

            if(error){
                console.log("Error al conectarse: ", error.message);
                return;
            }

            this.conectado = true;
            console.log("Base de datos online MYSQL");

        });

    }
}