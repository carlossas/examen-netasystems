

import { environment } from '../../environments/environment';
import moment from 'moment';

export function LOG(message: any, ...optionalParams: any[]) {
    let formato = 'DD-MM-YYYY HH:mm:ss'
    let fecha: string = moment().format(formato);
    let tag: string = `[LOG - ${fecha}]:`
    if (environment.LOGS == 'true') {
        if (optionalParams.length > 0) {
            //console.log(tag, message);
            optionalParams.forEach(element => {
                //console.log(tag, '=>', element);
            })
        } else {
            //console.log(tag, message);
        }
    }

}
export function ERRORLOG(message: any, ...optionalParams: any[]) {
    let formato = 'DD-MM-YYYY HH:mm:ss'
    let fecha: string = moment().format(formato);
    let tag: string = `[ERRORLOG - ${fecha}]:`
    if (optionalParams.length > 0) {
        console.error(tag, message);
        optionalParams.forEach(element => {
            console.error(tag, '=>', element);
        })
    } else {
        console.error(tag, message);
    }

}