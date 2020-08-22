import http from 'http';
import https from 'https';
import express, { Application } from 'express';
import { readFileSync } from "fs";
import moment from 'moment-timezone';
import 'moment/locale/es-us';
import { LOG } from '../util/ownlog';
import { MIDDLEWARES } from './middlewares.index';
import { Routes } from '../routes/routes.module';
import { environment } from '../../environments/environment';


export let WEB_SERVER: Application;

export class Server {
    constructor() {
        this.WebService();
    }

    WebService() {
        LOG("Iniciando servidor... ");
        LOG("Fecha de inicio: " + <string>moment().locale('es').format('YYYY-MM-DDD HH:mm'));
        WEB_SERVER = express();
        this.LoadMiddlewares();
        this.LoadRoutes();
        this.LoadTimeUtilities();
        // // Siempre a lo ultimo de la jerarquía
        this.InitializeServer();
    }

    InitializeServer() {
        let SERVER: http.Server;
        SERVER = http.createServer(WEB_SERVER);
        

        SERVER.listen(environment.PORT, () => {
            console.table([{
                Nombre: 'EXAMEN.NETASYSTEMS',
                Puerto: environment.PORT,
                Modo: environment.ENV,
                databaseIP: environment.database.host,
            }]);
        });

    }

    LoadMiddlewares() {
        WEB_SERVER.use(MIDDLEWARES);
    }
    
    LoadRoutes() {
        const routes = new Routes();
    }
    
    LoadTimeUtilities() {
        moment.tz("America/Mexico_City");
        moment.locale('es');
    }

}