import { Component } from '@angular/core';
import { Poblacion, Provincia } from '../../models/entity';
import { PoblacionService } from '../../services/poblacion.service';
import { Router } from '@angular/router';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-add-poblacion',
  templateUrl: './add-poblacion.component.html',
  styleUrl: './add-poblacion.component.css'
})
export class AddPoblacionComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Provincia[] = [];
  pob:Poblacion = {
    nombre: "",
    activo: 1,
    provincia: {
      // Los siguientes datos no se tienen en cuenta porque la base de datos solo necesita el 
      // id para asociar una tabla con la otra
      nombre: "", 
      activo: 0
    }
  }

  constructor(
    private _pobService:PoblacionService,
    private _provService:ProvinciaService,
    private _router:Router
  ) {}

  add():void {
    this.pob.nombre = this.pob.nombre.toUpperCase();
    if(this.pob.provincia.id === 0) {
      this.pob.provincia.id = 1;
    }
    this._pobService.addPoblacion(this.pob).subscribe({
      next: (pobNew) => {console.log(pobNew)/*this.tipo = tipoNew*/},
      error: (error) => {
        this._router.navigate(["/error"]);
      },
      complete: () => {this._router.navigate(["/list-poblaciones"])}
    });
  }

  getData():void {
    this._provService.getProvinciasActivas().subscribe({
      next: (aProvincias) => {
        this.aDatos = aProvincias;
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
