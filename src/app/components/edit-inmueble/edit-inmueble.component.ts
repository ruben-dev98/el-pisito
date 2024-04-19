import { Component } from '@angular/core';
import { Inmueble, Poblacion, Tipo } from '../../models/entity';
import { PoblacionService } from '../../services/poblacion.service';
import { TipoService } from '../../services/tipo.service';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-inmueble',
  templateUrl: './edit-inmueble.component.html',
  styleUrl: './edit-inmueble.component.css'
})
export class EditInmuebleComponent {

  id:number = 0;
  nFases:number = 3;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aPob:Poblacion[] = [];
  aTipo:Tipo[] = [];
  inmueble:Inmueble = {
    titular: "",
    amueblado: 0,
    apertura: "",
    ascensor: 0,
    cp: "",
    descripcion: "",
    jardin: 0,
    nombreVia: "",
    numero: "",
    numeroBalcones: "",
    numeroBanhos: "",
    numeroHabitaciones: "",
    operacion: "",
    orientacion: "",
    piscina: 0,
    planta: "",
    plazasGaraje: "",
    portada: 0,
    precio: 0,
    puerta: "",
    superficieConstruida: "",
    superficieUtil: "",
    tenderero: 0,
    tipoCalefaccion: "",
    trastero: 0,
    via: "",
    activo: 1,
    poblacion: {
      // Los siguientes datos no se tienen en cuenta porque la base de datos solo necesita el 
      // id para asociar una tabla con la otra
      nombre: "", 
      activo: 0,
      provincia: {
        nombre: "",
        activo: 0
      }
    },
    tipo: {
      nombre: "",
      activo: 0
    }
  }

  constructor(
    private _pobService:PoblacionService,
    private _tipoService:TipoService,
    private _inmuebleService:InmuebleService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  edit():void {
    this.toUpperCase();
    this.toNumber();
    this._inmuebleService.updateInmueble(this.inmueble).subscribe({
      next: (inmuebleUpdated) => {console.log(inmuebleUpdated)/*this.tipo = tipoNew*/},
      error: (error) => {
        console.log(error);
        this._router.navigate(["/error"]);
      },
      complete: () => {this._router.navigate(["/list-inmuebles"])}
    });
  }

  toUpperCase():void {
    this.inmueble.apertura = this.inmueble.apertura.toUpperCase();
    this.inmueble.nombreVia = this.inmueble.nombreVia.toUpperCase();
    this.inmueble.orientacion = this.inmueble.orientacion.toUpperCase();
    this.inmueble.tipoCalefaccion = this.inmueble.tipoCalefaccion.toUpperCase();
    this.inmueble.titular = this.inmueble.titular.toUpperCase();
    this.inmueble.via = this.inmueble.via.toUpperCase();
  }

  toNumber():void {
    this.inmueble.amueblado = Number(this.inmueble.amueblado);
    this.inmueble.ascensor = Number(this.inmueble.ascensor);
    this.inmueble.jardin = Number(this.inmueble.jardin);
    this.inmueble.piscina = Number(this.inmueble.piscina);
    this.inmueble.portada = Number(this.inmueble.portada);
    this.inmueble.tenderero = Number(this.inmueble.tenderero);
    this.inmueble.trastero = Number(this.inmueble.trastero);
    this.inmueble.activo = Number(this.inmueble.activo);
  }

  getData():void {
    this._inmuebleService.getInmueble(this.id).subscribe({
      next: (data) => {this.inmueble = data/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getDataPob() {
    this._pobService.getPoblaciones().subscribe({
      next: (aDatos) => {
        this.aPob = aDatos;
      },
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getDataTipo() {
    this._tipoService.getTipos().subscribe({
      next: (aDatos) => {
        this.aTipo = aDatos;
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

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }
  
  ngOnInit(): void {
    this.getParams();
    this.getData();
    this.getDataPob();
    this.getDataTipo();
  }

}
