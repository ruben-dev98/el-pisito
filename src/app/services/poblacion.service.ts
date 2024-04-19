import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Poblacion } from '../models/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoblacionService {

  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getPoblaciones():Observable<Poblacion[]> {
    return this._http.get<Poblacion[]>(this.url.concat("poblaciones"));
  }

  getPoblacionesActivas():Observable<Poblacion[]> {
    return this._http.get<Poblacion[]>(this.url.concat("poblaciones-activas"));
  }

  getPoblacion(id:number):Observable<Poblacion> {
    return this._http.get<Poblacion>(this.url.concat("poblacion/").concat(id.toString()));
  }

  addPoblacion(pob:Poblacion):Observable<Poblacion> {
    return this._http.post<Poblacion>(this.url.concat("poblacion"), pob);
  }
  
  updatePoblacion(pob:Poblacion):Observable<Poblacion> {
    return this._http.put<Poblacion>(this.url.concat("poblacion"), pob);
  }
}
