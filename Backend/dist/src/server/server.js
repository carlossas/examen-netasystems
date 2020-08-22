"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.WEB_SERVER = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
require("moment/locale/es-us");
const ownlog_1 = require("../util/ownlog");
const middlewares_index_1 = require("./middlewares.index");
const routes_module_1 = require("../routes/routes.module");
const environment_1 = require("../../environments/environment");
class Server {
    constructor() {
        this.WebService();
    }
    WebService() {
        ownlog_1.LOG("Iniciando servidor... ");
        ownlog_1.LOG("Fecha de inicio: " + moment_timezone_1.default().locale('es').format('YYYY-MM-DDD HH:mm'));
        exports.WEB_SERVER = express_1.default();
        this.LoadMiddlewares();
        this.LoadRoutes();
        this.LoadTimeUtilities();
        // // Siempre a lo ultimo de la jerarquía
        this.InitializeServer();
    }
    InitializeServer() {
        let SERVER;
        SERVER = http_1.default.createServer(exports.WEB_SERVER);
        SERVER.listen(environment_1.environment.PORT, () => {
            console.table([{
                    Nombre: 'EXAMEN.NETASYSTEMS',
                    Puerto: environment_1.environment.PORT,
                    Modo: environment_1.environment.ENV,
                    databaseIP: environment_1.environment.database.host,
                }]);
        });
    }
    LoadMiddlewares() {
        exports.WEB_SERVER.use(middlewares_index_1.MIDDLEWARES);
    }
    LoadRoutes() {
        const routes = new routes_module_1.Routes();
    }
    LoadTimeUtilities() {
        moment_timezone_1.default.tz("America/Mexico_City");
        moment_timezone_1.default.locale('es');
    }
}
exports.Server = Server;
