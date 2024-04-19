import { Component } from '@angular/core';
import { TipoService } from '../../services/tipo.service';
import { PoblacionService } from '../../services/poblacion.service';
import { InmuebleService } from '../../services/inmueble.service';
import { Inmueble, Poblacion, Tipo } from '../../models/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inmueble',
  templateUrl: './add-inmueble.component.html',
  styleUrl: './add-inmueble.component.css'
})
export class AddInmuebleComponent {

  nFases:number = 2;
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

    /* ESTE OBJETO LO UTILIZAMOS SÓLO PARA RELLENARLO DESDE LA VISTA
  Y ENVIARLO A LA API */
  /*inmueble:Inmueble={
    activo:1,
    amueblado:0,
    apertura:"",
    ascensor:0,
    cp:"",
    descripcion:"",
    jardin:0,
    nombreVia:"",
    numero:"",
    numeroBalcones:"",
    numeroBanhos:"",
    numeroHabitaciones:"",
    orientacion:"",
    piscina:0,
    planta:"",
    plazasGaraje:"",
    portada:0,
    precio:0,
    puerta:"",
    superficieConstruida:"",
    superficieUtil:"",
    tendedero:0,
    tipoCalefaccion:"",
    titular:"",
    trastero:0,
    via:"",
    poblacion:{
      nombre:"",
      provincia:{
        nombre:"",
        activo:0

      },
      activo:0
    },
    tipo:{
      nombre:"",
      activo:0
    }
  }*/


  constructor(
    private _pobService:PoblacionService,
    private _tipoService:TipoService,
    private _inmuebleService:InmuebleService,
    private _router:Router
  ) {}

  add():void {
    this.toUpperCase();
    this.toNumber();
    this._inmuebleService.addInmueble(this.inmueble).subscribe({
      next: (inmuebleNew) => {console.log(inmuebleNew)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"]);},
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
  }

  getDataPob() {
    this._pobService.getPoblacionesActivas().subscribe({
      next: (aDatos) => {
        this.aPob = aDatos;
      },
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getDataTipo() {
    this._tipoService.getTiposActivos().subscribe({
      next: (aDatos) => {
        this.aTipo = aDatos;
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
    this.getDataPob();
    this.getDataTipo();
  }

}
