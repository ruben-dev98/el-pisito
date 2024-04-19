import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  
  requestFinal:Observable<HttpEvent<any>>;
  requestCloned:any;
  
  constructor(
    private _authService:AuthService
  ){}
  //Request inmutable por eso se necesita clonear
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    const token = this._authService.getToken();
    if(token != null) {
      this.requestCloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer ".concat(token)),
      });
      this.requestFinal = next.handle(this.requestCloned);
    } else {
      this.requestFinal = next.handle(req);
    }
    return this.requestFinal;
    //return this.requestFinal = next.handle(req);
  }
}
