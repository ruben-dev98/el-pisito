import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exist'
})
export class ExistPipe implements PipeTransform {

  transform(value:number):string {
    return value < 1 ? "fa-solid fa-xmark text-red":"fa-solid fa-check text-green";
  }

}
