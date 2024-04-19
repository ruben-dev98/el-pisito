import { Component, Input } from '@angular/core';
import { Inmueble } from '../../models/entity';
import { GLOBAL } from '../../services/global';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-ficha',
  templateUrl: './carousel-ficha.component.html',
  styleUrl: './carousel-ficha.component.css'
})
export class CarouselFichaComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  url_img:string = GLOBAL.IMG_URL;
  num_images:number = 0;
  notDetail:boolean = true;
  @Input() dato:Inmueble;

  constructor(
    private _imageService:ImageService,
    private _router:Router
  ) {}

  getData():void {
    let id = this.dato.id || 0;
    this._imageService.getImagesActivasInmueble(id).subscribe({
      next: (aImages) => {
        this.dato.imagenes = aImages;
        this.num_images = aImages.length;
      },
      error: (error) => {
        //this._router.navigate(['/error']);
        this.isLoadComplete()
      },
      complete: () => {this.isLoadComplete()}
    });
  }

  isDisplayInmueble():void {
    if (this._router.url.includes("detail-inmueble")) {
      this.notDetail = false;
    }
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }

  ngOnInit(): void {
    this.getData();
    this.isDisplayInmueble();
  }

}
