import { Component } from '@angular/core';
import { InmuebleService } from '../../services/inmueble.service';
import { Router } from '@angular/router';
import { Inmueble } from '../../models/entity';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-list-home',
  templateUrl: './list-home.component.html',
  styleUrl: './list-home.component.css'
})
export class ListHomeComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Inmueble[] = [];
  
  constructor(
    private _inmuebleService:InmuebleService,
    private _router:Router
  ) {}

  getData():void {
    this._inmuebleService.getInmueblesPortada().subscribe({
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
