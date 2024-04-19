import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Image } from '../models/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url:string = GLOBAL.API_URL;
  url_media = GLOBAL.MEDIA_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getImagesActivasInmueble(id:number):Observable<Image[]> {
    return this._http.get<Image[]>(this.url.concat("imagenes-activas/").concat(id.toString()));
  }

  getImagesInmueble(id:number):Observable<Image[]> {
    return this._http.get<Image[]>(this.url.concat("imagenes/").concat(id.toString()));
  }
  
  uploadImage(formData:FormData, idInm:number):Observable<any> {
    return this._http.post<any>(this.url_media.concat("upload/").concat(idInm.toString()), formData);
  }
}
