import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImage]'
})
export class NoImageDirective {

  constructor(
    private nodoDOM:ElementRef,
    private renderer:Renderer2
  ) { }

  /* @HostListener decora el método onError. Cuando se produce un error en el dom se llama
  automáticamente */
  @HostListener("error")
  onError():void{
    /* primer argumento: elemento de Dom, segundo argumento: nombre atributo
    tercer argumento: nuevo valor del atributo */
    this.renderer.setAttribute(this.nodoDOM.nativeElement,"src","assets/img/no-image.jpg");
  }

}
