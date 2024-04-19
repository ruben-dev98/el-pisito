import { Component } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { Router } from '@angular/router';
import { Provincia } from '../../models/entity';

@Component({
  selector: 'app-add-provincia',
  templateUrl: './add-provincia.component.html',
  styleUrl: './add-provincia.component.css'
})
export class AddProvinciaComponent {

  prov:Provincia = {
    nombre: "",
    activo: 1
  }

  constructor(
    private _provService:ProvinciaService,
    private _router:Router
  ) {}

  add():void {
    this.prov.nombre = this.prov.nombre.toUpperCase();
    this._provService.addProvincia(this.prov).subscribe({
      next: (provNew) => {console.log(provNew)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this._router.navigate(["/list-provincias"])}
    });
  }

}
