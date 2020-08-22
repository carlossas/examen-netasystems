/**
 * Configuraciones del ambiente de desarrollo de la aplicacion
 */
export namespace ConfigCore {
    export interface Environment {
        //Puerto al en el que se va a levantar
        PORT: number | string,
        //El ambiente de desarrollo
        ENV: 'development' | 'production' | 'preproduction' | string,
        //Esta variable determina si se veran todos los logs de control que se tienen en la aplicacion
        LOGS: 'true' | 'false' | string,
        //El formato de fecha que se manejara en la app
        DATEFORMAT: string,
        //La configuracion de la conexion a base de datos (esta varia segun la db)
        database: DatabaseConfig,
        //La configuracion de la sesion
        Session?: Session,
    }
    //Configuracion de base de datos
    export interface DatabaseConfig {
        database: string,
        user: string,
        password: string,
        host: string,
        port?: number,
    }

    //Parametros de la sesion
    export interface Session {
        secret: string,
        expires: number,
        name: string,
    }
   
}
