import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from '../../services/provincia.service';
import { Provincia } from '../../models/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-provincia',
  templateUrl: './list-provincia.component.html',
  styleUrl: './list-provincia.component.css'
})
export class ListProvinciaComponent implements OnInit {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Provincia[] = [];

  constructor(
    private _provService:ProvinciaService,
    private _router:Router
  ) {}

  getData():void {
    this._provService.getProvincias().subscribe({
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
