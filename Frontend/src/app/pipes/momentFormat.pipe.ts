import { Pipe, PipeTransform } from '@angular/core';
//MOMENTJS
import * as moment from 'moment';

@Pipe({
    name: "momentformat"
})

export class MomentFormatPipe implements PipeTransform {
    transform(date: any, format: string) {
        if (date) {
            return moment(date).locale('es').format(format);
        }
    }
}