import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Inmueble } from '../models/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getInmuebles():Observable<Inmueble[]> {
    return this._http.get<Inmueble[]>(this.url.concat("inmuebles"));
  }

  getInmueblesActivos():Observable<Inmueble[]> {
    return this._http.get<Inmueble[]>(this.url.concat("inmuebles-activos"));
  }

  getInmueblesFinder(pob:number, tipo:number, op:string):Observable<Inmueble[]> {
    return this._http.get<Inmueble[]>(`${this.url}inmuebles/${pob}/${tipo}/${op}`);
  }

  getInmueblesPortada():Observable<Inmueble[]> {
    return this._http.get<Inmueble[]>(this.url.concat("inmuebles-portada"));
  }

  getInmueble(id:number):Observable<Inmueble> {
    return this._http.get<Inmueble>(this.url.concat("inmueble/").concat(id.toString()));
  }

  addInmueble(inmueble:Inmueble):Observable<Inmueble> {
    return this._http.post<Inmueble>(this.url.concat("inmueble"), inmueble);
  }
  
  updateInmueble(inmueble:Inmueble):Observable<Inmueble> {
    return this._http.put<Inmueble>(this.url.concat("inmueble"), inmueble);
  }
}
