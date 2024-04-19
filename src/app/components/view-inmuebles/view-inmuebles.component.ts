import { Component } from '@angular/core';
import { Inmueble } from '../../models/entity';
import { InmuebleService } from '../../services/inmueble.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-inmuebles',
  templateUrl: './view-inmuebles.component.html',
  styleUrl: './view-inmuebles.component.css'
})
export class ViewInmueblesComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Inmueble[] = [];
  
  constructor(
    private _inmuebleService:InmuebleService,
    private _router:Router
  ) {}

  getData():void {
    this._inmuebleService.getInmueblesActivos().subscribe({
      next: (aInmuebles) => {this.aDatos = aInmuebles},
      error: (error) => {this._router.navigate(['/error'])},
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
