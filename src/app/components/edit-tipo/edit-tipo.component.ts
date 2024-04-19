import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-tipo',
  templateUrl: './edit-tipo.component.html',
  styleUrl: './edit-tipo.component.css'
})
export class EditTipoComponent implements OnInit {
  
  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  id:number = 0;
  tipo:Tipo = {
    id: 0,
    nombre: "",
    activo: 1
  }

  constructor(
    private _tipoService:TipoService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  getData():void {
    this._tipoService.getTipo(this.id).subscribe({
      next: (data) => {this.tipo = data/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
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
    this.tipo.nombre = this.tipo.nombre.toUpperCase();
    this.tipo.activo = Number(this.tipo.activo);
    this._tipoService.updateTipo(this.tipo).subscribe({
      next: (tipoUpdated) => {console.log(tipoUpdated)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this._router.navigate(["/list-tipos"])}
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
  }
}
