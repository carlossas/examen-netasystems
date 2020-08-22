"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORLOG = exports.LOG = void 0;
const environment_1 = require("../../environments/environment");
const moment_1 = __importDefault(require("moment"));
function LOG(message, ...optionalParams) {
    let formato = 'DD-MM-YYYY HH:mm:ss';
    let fecha = moment_1.default().format(formato);
    let tag = `[LOG - ${fecha}]:`;
    if (environment_1.environment.LOGS == 'true') {
        if (optionalParams.length > 0) {
            //console.log(tag, message);
            optionalParams.forEach(element => {
                //console.log(tag, '=>', element);
            });
        }
        else {
            //console.log(tag, message);
        }
    }
}
exports.LOG = LOG;
function ERRORLOG(message, ...optionalParams) {
    let formato = 'DD-MM-YYYY HH:mm:ss';
    let fecha = moment_1.default().format(formato);
    let tag = `[ERRORLOG - ${fecha}]:`;
    if (optionalParams.length > 0) {
        console.error(tag, message);
        optionalParams.forEach(element => {
            console.error(tag, '=>', element);
        });
    }
    else {
        console.error(tag, message);
    }
}
exports.ERRORLOG = ERRORLOG;
