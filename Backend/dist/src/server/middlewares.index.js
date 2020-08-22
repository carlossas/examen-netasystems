"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDDLEWARES = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = require("express");
const environment_1 = require("../../environments/environment");
const express_useragent_1 = __importDefault(require("express-useragent"));
const SessionConfig = environment_1.environment.Session;
exports.MIDDLEWARES = [
    cors_1.default(),
    helmet_1.default(),
    express_1.json({ limit: '50mb' }),
    express_1.urlencoded({ limit: '50mb' }),
    compression_1.default(),
    cookie_parser_1.default(),
    express_useragent_1.default.express()
];
if (SessionConfig) {
    exports.MIDDLEWARES.push(express_session_1.default({
        secret: SessionConfig.secret,
        name: SessionConfig.name,
        cookie: {
            maxAge: new Date(Date.now() + SessionConfig.expires).getMilliseconds(),
            expires: new Date(Date.now() + SessionConfig.expires),
        }
    }));
}
