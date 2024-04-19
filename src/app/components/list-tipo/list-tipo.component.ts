import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/entity';
import { TipoService } from '../../services/tipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrl: './list-tipo.component.css'
})
export class ListTipoComponent implements OnInit {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Tipo[] = [];
  
  constructor(
    private _tipoService:TipoService,
    private _router:Router
  ) {}

  getData():void {
    this._tipoService.getTipos().subscribe({
      next: (aTipos) => {
        this.aDatos = aTipos;
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
