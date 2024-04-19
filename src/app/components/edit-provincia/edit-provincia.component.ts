import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from '../../models/entity';

@Component({
  selector: 'app-edit-provincia',
  templateUrl: './edit-provincia.component.html',
  styleUrl: './edit-provincia.component.css'
})
export class EditProvinciaComponent implements OnInit {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  id:number = 0;
  prov:Provincia = {
    id: 0,
    nombre: "",
    activo: 1
  }

  constructor(
    private _provService:ProvinciaService,
    private _router:Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  getData():void {
    this._provService.getProvincia(this.id).subscribe({
      next: (data) => {this.prov = data/*this.tipo = tipoNew*/},
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
    this.prov.nombre = this.prov.nombre.toUpperCase();
    this.prov.activo = Number(this.prov.activo);
    this._provService.updateProvincia(this.prov).subscribe({
      next: (provUpdated) => {console.log(provUpdated)/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this._router.navigate(["/list-provincias"])}
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
