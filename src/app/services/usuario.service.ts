import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string = GLOBAL.API_URL;

  constructor(
    private _http:HttpClient
  ) { }

  getUsuarios():Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this.url.concat("usuarios"));
  }

  getUsuariosActivos():Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this.url.concat("usuarios-activos"));
  }

  getUsuario(id:number):Observable<Usuario> {
    return this._http.get<Usuario>(this.url.concat("usuario/").concat(id.toString()));
  }

  addUsuario(usuario:Usuario):Observable<Usuario> {
    return this._http.post<Usuario>(this.url.concat("usuario"), usuario);
  }
  
  updateUsuario(usuario:Usuario):Observable<Usuario> {
    return this._http.put<Usuario>(this.url.concat("usuario"), usuario);
  }
  
}
