import { Component } from '@angular/core';
import { PoblacionService } from '../../services/poblacion.service';
import { Poblacion } from '../../models/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-poblacion',
  templateUrl: './list-poblacion.component.html',
  styleUrl: './list-poblacion.component.css'
})
export class ListPoblacionComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Poblacion[] = [];

  constructor(
    private _pobService:PoblacionService,
    private _router:Router
  ) {}

  getData():void {
    this._pobService.getPoblaciones().subscribe({
      next: (aPoblacion) => {
        this.aDatos = aPoblacion;
      },
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
