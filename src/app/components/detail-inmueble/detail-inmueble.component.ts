import { Component } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-inmueble',
  templateUrl: './detail-inmueble.component.html',
  styleUrl: './detail-inmueble.component.css'
})
export class DetailInmuebleComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  id:number;
  inmueble:any={};
  
  constructor(
    private _inmuebleService:InmuebleService,
    private _router:Router,
    private _route:ActivatedRoute
  ){}

  getData():void{
    this._inmuebleService.getInmueble(this.id).subscribe({
      next: (dato)=>{this.inmueble = dato},
      error: (error)=>{this._router.navigate(['/error'])},
      complete: ()=>{this.isLoadComplete()}
    });
  }
  
  getParams():void {
  this._route.params.subscribe({
    next:(params)=>{this.id=params['id']},
    error:(error)=>{this._router.navigate(["/error"])}
  })
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
