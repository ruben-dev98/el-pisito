import { Component, ElementRef, ViewChild } from '@angular/core';
import { InmuebleService } from '../../services/inmueble.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Image, Inmueble } from '../../models/entity';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  
  @ViewChild('image') image:ElementRef; //Variable de template podemos utilizar esta template para vincular el input de file
  idInmueble:number;
  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aImage:string[] = [];
  inmueble:Inmueble;

  constructor(
    private _inmuebleService:InmuebleService,
    private _imageService:ImageService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router
  ) {}

  getData():void {
    this._inmuebleService.getInmueble(this.idInmueble).subscribe({
      next: (inmueble) => {this.inmueble = inmueble},
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()}
    });
  }

  getParams():void {
    this._activatedRoute.params.subscribe({
      next: (params) => {this.idInmueble = params["id"]/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])}
    });
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }

  uploadImage(e:any):void {
    const file = e.target.files[0]
    if(file) {
      for(let file of e.target.files) {
        const formData = new FormData();
        formData.append("file", file);
        this._imageService.uploadImage(formData, this.idInmueble).subscribe({
          next: (datos) => {this.aImage.push(datos.URL)},
          error: (error) => {this._router.navigate(['/error'])},
          complete: () => {this.image.nativeElement.value = null}
        });
      }
    }
  }
  
  ngOnInit(): void {
    this.getParams();
    this.getData();
  }

}
