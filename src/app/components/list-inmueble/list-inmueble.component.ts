import { Component } from '@angular/core';
import { InmuebleService } from '../../services/inmueble.service';
import { Router } from '@angular/router';
import { Inmueble } from '../../models/entity';

@Component({
  selector: 'app-list-inmueble',
  templateUrl: './list-inmueble.component.html',
  styleUrl: './list-inmueble.component.css'
})
export class ListInmuebleComponent {
  
  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Inmueble[] = [];
  
  constructor(
    private _inmuebleService:InmuebleService,
    private _router:Router
  ) {}

  getData():void {
    this._inmuebleService.getInmuebles().subscribe({
      next: (aInmuebles) => {
        this.aDatos = aInmuebles;
        for(let dato of this.aDatos) {
          dato.direccionCompleta = `${dato.via} ${dato.nombreVia} ${dato.numero}, ${dato.planta} ${dato.puerta}`
        }
      },
      error: (error) => {this._router.navigate(['/error']); console.log(error);},
      complete: () => {this.isLoadComplete()}
    });
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }
  
  ngOnInit(): void {
    this.getData();
  }
}
