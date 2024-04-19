import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(value:number):string {
    return value < 1 ? "NO":"SI";
  }

}
