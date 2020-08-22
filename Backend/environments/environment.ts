
import { ConfigCore } from "./interfaces/environment.interface";

export const environment: ConfigCore.Environment= {
    PORT: process.env.PORT || 3000,
    ENV: <string>process.env.NODE_ENV || 'development',
    LOGS: <string>process.env.LOGS || 'true',
    DATEFORMAT: 'YYYY-MM-DD HH:mm:ss',
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'examen_neta_systems',
    }
    
}