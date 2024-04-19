import { Component } from '@angular/core';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html',
  styleUrl: './add-tipo.component.css'
})
export class AddTipoComponent {

  tipo:Tipo = {
    nombre: "",
    activo: 1
  }

  constructor(
    private _tipoService:TipoService,
    private _router:Router
  ) {}

  add():void {
    this.tipo.nombre = this.tipo.nombre.toUpperCase();
    this._tipoService.addTipo(this.tipo).subscribe({
      next: (tipoNew) => {console.log(tipoNew)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this._router.navigate(["/list-tipos"])}
    });
  }

}
