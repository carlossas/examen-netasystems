"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    PORT: process.env.PORT || 3000,
    ENV: process.env.NODE_ENV || 'development',
    LOGS: process.env.LOGS || 'true',
    DATEFORMAT: 'YYYY-MM-DD HH:mm:ss',
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'examen_neta_systems',
    }
};
