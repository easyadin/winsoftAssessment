import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.replace(/Javascript/gi,'js'); //return value
  }

}
