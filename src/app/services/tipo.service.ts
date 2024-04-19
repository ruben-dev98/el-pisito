import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tipo } from '../models/entity';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipoService {
  
  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getTipos():Observable<Tipo[]> {
    return this._http.get<Tipo[]>(this.url.concat("tipos"));
  }

  getTiposActivos():Observable<Tipo[]> {
    return this._http.get<Tipo[]>(this.url.concat("tipos-activos"));
  }

  getTipo(id:number):Observable<Tipo> {
    return this._http.get<Tipo>(this.url.concat("tipo/").concat(id.toString()));
  }

  addTipo(tipo:Tipo):Observable<Tipo> {
    return this._http.post<Tipo>(this.url.concat("tipo"), tipo);
  }
  
  updateTipo(tipo:Tipo):Observable<Tipo> {
    return this._http.put<Tipo>(this.url.concat("tipo"), tipo);
  }
}
