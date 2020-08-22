"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const routes_index_1 = require("./routes.index");
const server_1 = require("../server/server");
/**
 * =============================================
 *
 * Clase de rutas en este caso se hace uso de la
 * variable global "WEB_SERVER" para inicializar
 * los routers.
 *
 * =============================================
 */
class Routes {
    constructor() {
        //Sistema de API
        server_1.WEB_SERVER.use('/', routes_index_1.routesAPI);
        this.RouteNotMatched();
        this.RouteTokenErrorHandler();
    }
    /**
     * ==========================================
     *
     * Si alguna ruta no se encuentra, manda el error 404
     *
     * ==========================================
     */
    RouteNotMatched() {
        server_1.WEB_SERVER.use('*', (req, res) => {
            res.status(404).send({
                error: true,
                msg: "Ruta no encontrada"
            });
        });
    }
    RouteTokenErrorHandler() {
        server_1.WEB_SERVER.use((err, req, res, next) => {
            if (err.name === 'UnauthorizedError') {
                switch (err.code) {
                    case 'credentials_required':
                        res.status(401).json({
                            error: true,
                            msg: 'No ha proporcionado sus credenciales. Inicie sesión por favor.',
                            misc: err,
                        });
                        break;
                    case 'invalid_token':
                        switch (err.inner.name) {
                            case 'TokenExpiredError':
                                res.status(401).json({
                                    error: true,
                                    msg: 'Su sesión ha expirado. Por favor inicie sesión nuevamente',
                                    misc: err.inner,
                                });
                                break;
                            case 'JsonWebTokenError':
                                res.status(401).json({
                                    error: true,
                                    msg: 'Ocurrió un error con las credenciales proporcionadas. Contacte al administrador del sistema.',
                                    misc: err.inner,
                                });
                                break;
                            default:
                                res.status(401).json({
                                    error: true,
                                    msg: 'Error interno. Contacte al administrador del sistema.',
                                    misc: err.inner,
                                });
                                break;
                        }
                        break;
                    default:
                        res.status(401).json({
                            error: true,
                            msg: 'Error desconocido. Verifique con el administrador del sistema.',
                            misc: err,
                        });
                        break;
                }
            }
        });
    }
}
exports.Routes = Routes;
