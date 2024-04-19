import { Component } from '@angular/core';
import { Inmueble } from '../../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { InmuebleService } from '../../services/inmueble.service';
import { PoblacionService } from '../../services/poblacion.service';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-list-finder',
  templateUrl: './list-finder.component.html',
  styleUrl: './list-finder.component.css'
})
export class ListFinderComponent {
  nFases:number = 3;
  loadFases:number = 0;
  loadComplete:boolean = false;
  idPob:number;
  idTipo:number;
  operacion:string;
  namePob:string;
  nameProv:string;
  nameTipo:string;
  aDatos:Inmueble[] = [];
  
  constructor(
    private _inmuebleService:InmuebleService,
    private _poblacionService:PoblacionService,
    private _tipoService:TipoService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute
  ) {}

  getData():void {
    this._inmuebleService.getInmueblesFinder(this.idPob, this.idTipo, this.operacion).subscribe({
      next: (aInmueble) => {this.aDatos = aInmueble},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getSearch():void {
    this._poblacionService.getPoblacion(this.idPob).subscribe({
      next: (pob) => {this.namePob = pob.nombre; this.nameProv = pob.provincia.nombre;},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete()}
    });

    this._tipoService.getTipo(this.idTipo).subscribe({
      next: (tipo) => {this.nameTipo = tipo.nombre},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getParams():void {
    this._activatedRoute.params.subscribe({
      next: (params) => {
        this.idPob = params["pob"];
        this.idTipo = params["tipo"];
        this.operacion = params["op"];
    },
      error: (error) => {this._router.navigate(["/error"])}
    });
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }
  
  ngOnInit(): void {
    this.getParams();
    this.getSearch();
    this.getData();
  }
}
