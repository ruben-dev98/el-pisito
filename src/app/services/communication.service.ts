import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  header:BehaviorSubject<boolean> = new BehaviorSubject(true);
  header$ = this.header.asObservable(); 
  footer:BehaviorSubject<boolean> = new BehaviorSubject(false);
  footer$ = this.footer.asObservable(); 
  login:BehaviorSubject<boolean> = new BehaviorSubject(this._authService.isLoggedIn());
  login$ = this.login.asObservable(); 
  
  constructor(
    private _authService:AuthService
  ) { }

  headerChanges(state:boolean):void {
    this.header.next(state);
  }

  footerChanges(state:boolean):void {
    this.footer.next(state);
  }

  loginChanges(state:boolean):void {
    this.login.next(state);
  }

}
