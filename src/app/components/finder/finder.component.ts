import { Component, OnInit } from '@angular/core';
import { Poblacion, Search, Tipo } from '../../models/entity';
import { Router } from '@angular/router';
import { TipoService } from '../../services/tipo.service';
import { PoblacionService } from '../../services/poblacion.service';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrl: './finder.component.css'
})
export class FinderComponent implements OnInit {

  nFases:number = 2;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aPoblacion:Poblacion[] = [];
  aTipos:Tipo[] = [];
  aOperaciones:string[] = ["VENTA", "ALQUILER", "TRASPASO"];

  pob:Poblacion;
  tipo:Tipo;
  operacion:String;

  constructor(
    private _poblacionService:PoblacionService,
    private _tipoService:TipoService,
    private _router:Router
  ) {}

  getData():void {
    this._poblacionService.getPoblacionesActivas().subscribe({
      next: (aPoblacion) => {this.aPoblacion = aPoblacion},
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()},
    });
    this._tipoService.getTiposActivos().subscribe({
      next: (aTipos) => {this.aTipos = aTipos},
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()},
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  find():void {
    /*localStorage.setItem("nameTipo", this.tipo.nombre);
    localStorage.setItem("namePob", this.pob.nombre);
    localStorage.setItem("nameProv", this.pob.provincia.nombre);*/
    this._router.navigate(["/list-finder", this.pob.id, this.tipo.id, this.operacion]);
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }

}
