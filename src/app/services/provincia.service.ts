import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Provincia } from '../models/entity';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getProvincias():Observable<Provincia[]> {
    return this._http.get<Provincia[]>(this.url.concat("provincias"));
  }

  getProvinciasActivas():Observable<Provincia[]> {
    return this._http.get<Provincia[]>(this.url.concat("provincias-activas"));
  }

  getProvincia(id:number):Observable<Provincia> {
    return this._http.get<Provincia>(this.url.concat("provincia/").concat(id.toString()));
  }

  addProvincia(prov:Provincia):Observable<Provincia> {
    return this._http.post<Provincia>(this.url.concat("provincia"), prov);
  }
  
  updateProvincia(prov:Provincia):Observable<Provincia> {
    return this._http.put<Provincia>(this.url.concat("provincia"), prov);
  }
}
