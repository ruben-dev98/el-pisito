import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amueblado'
})
export class AmuebladoPipe implements PipeTransform {

  transform(value:number):string {
    return value == 0 ? "NO AMUEBLADO": "AMUEBLADO";
  }

}
