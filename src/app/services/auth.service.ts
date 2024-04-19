import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { Credentials } from '../models/entity';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = GLOBAL.BASE_URL;
  token:any;

  constructor(
    private _http:HttpClient
  ) { }

  login(credenciales:Credentials):Observable<any> {
    return this._http.post<any>(this.url.concat('authenticate'), credenciales);
  }

  signin(credenciales:Credentials):Observable<any> {
    return this._http.post<any>(this.url.concat('authenticate'), credenciales);
  }

  logout():void {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn():boolean {
    let token = this.getToken();
    const helper = new JwtHelperService();
    if(!token) {
      return false;
    } else {
      try {
        helper.decodeToken(token);
      } catch(e) {
        return false;
      }
      const isExpired = this.isTokenExpired(token);
      return !isExpired;
    }
  }

  isTokenExpired(token:string|null) {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    if(isExpired) this.logout();
    return isExpired;
  }

  getToken():string|null {
    if(!this.isTokenExpired(localStorage.getItem('token'))) return localStorage.getItem('token');
    return null;
  }

  setTokenInLocalStorage(token:string):void {
    // Si existe borralo
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    // Despues le damos valor al token hubiese existido o no
    localStorage.setItem('token', token);
  }

  getUsuario():string {
    let decodedToken = this.decodeToken();
    return decodedToken.USER;
  }

  getRol():string {
    let decodedToken = this.decodeToken();
    let rol:string = decodedToken.ROLES.substring();
    if(rol.includes("USER")) {
      return 'user';
    } else if(rol.includes("ADMIN")) {
      return 'admin';
    }
    return '';
  }

  getId():number {
    let decodedToken = this.decodeToken();
    return decodedToken.ID;
  }

  decodeToken():any {
    this.token = this.getToken();
    const helper = new JwtHelperService();
    return helper.decodeToken(this.token);
  }
}
