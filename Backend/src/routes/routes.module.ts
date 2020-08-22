import { routesAPI } from './routes.index';
import { WEB_SERVER } from "../server/server";
import { Request, Response, NextFunction } from 'express';

/**
 * =============================================
 * 
 * Clase de rutas en este caso se hace uso de la
 * variable global "WEB_SERVER" para inicializar 
 * los routers.
 * 
 * =============================================
 */
export class Routes {
    constructor() {
        //Sistema de API
        WEB_SERVER.use('/', routesAPI);
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
        WEB_SERVER.use('*', (req: Request, res: Response) => {
            res.status(404).send({
                error: true,
                msg: "Ruta no encontrada"
            });
        });
    }

    RouteTokenErrorHandler() {
        WEB_SERVER.use((err: any, req: Request, res: Response, next: NextFunction) => {
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