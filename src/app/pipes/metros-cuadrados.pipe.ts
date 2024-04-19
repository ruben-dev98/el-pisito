import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrosCuadrados'
})
export class MetrosCuadradosPipe implements PipeTransform {

  transform(value:string): string {
    return `${value} m²`;
  }

}
