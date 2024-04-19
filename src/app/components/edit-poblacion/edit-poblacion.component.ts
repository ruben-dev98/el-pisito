import { Component } from '@angular/core';
import { Poblacion, Provincia } from '../../models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { PoblacionService } from '../../services/poblacion.service';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-edit-poblacion',
  templateUrl: './edit-poblacion.component.html',
  styleUrl: './edit-poblacion.component.css'
})
export class EditPoblacionComponent {

  nFases:number = 2;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Provincia[] = [];
  id:number = 0;
  pob:Poblacion = {
    id: 0,
    nombre: "",
    activo: 1,
    provincia: {
      id: 0,
      // Los siguientes datos no se tienen en cuenta porque la base de datos solo necesita el 
      // id para asociar una tabla con la otra
      nombre: "",
      activo: 0
    }
  }

  constructor(
    private _pobService:PoblacionService,
    private _provService:ProvinciaService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  getData():void {
    this._pobService.getPoblacion(this.id).subscribe({
      next: (data) => {this.pob = data/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getDataProv() {
    this._provService.getProvincias().subscribe({
      next: (aProvincias) => {
        this.aDatos = aProvincias;
      },
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getParams():void {
    this._activatedRoute.params.subscribe({
      next: (params) => {this.id = params["id"]/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])}
    });
  }

  edit():void {
    this.pob.nombre = this.pob.nombre.toUpperCase();
    this.pob.activo = Number(this.pob.activo);
    this._pobService.updatePoblacion(this.pob).subscribe({
      next: (poblacionUpdated) => {console.log(poblacionUpdated)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this._router.navigate(["/list-poblaciones"])}
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
    this.getData();
    this.getDataProv();
  }

}
