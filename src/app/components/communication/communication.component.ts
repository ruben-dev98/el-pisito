import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css'
})
export class CommunicationComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  usuario:string;
  rol:string;
  @Input() isLogged:boolean;
  @Input() isAdmin:boolean;

  constructor(
    private _authService:AuthService,
    private _communicationService:CommunicationService,
    private _router:Router
    ) {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let url:string = this._router.url;
    this.controlChanges(url);
    this.loginIsLoggedChanges();
    this.subscribeHeader();
    this.subscribeFooter();
    this.subscribeLogin();
  }

  headerCommonChanges():void {
    this._communicationService.headerChanges(false);
  }

  headerCarouselChanges():void {
    this._communicationService.headerChanges(true);
  }
  
  subscribeHeader():void {
    this.subscription = this._communicationService.header$.subscribe({
      next: (datos) => {},
      error: (error) => {},
      complete: () => {}
    });
  }

  footerAdminChanges():void {
    this._communicationService.footerChanges(true);
  }

  footerCommonChanges():void {
    this._communicationService.footerChanges(false);
  }

  subscribeFooter():void {
    this.subscription = this._communicationService.footer$.subscribe({
      next: (datos) => {},
      error: (error) => {},
      complete: () => {}
    });
  }

  controlChanges(url:string):void {
    if(url.includes("home") || url.endsWith("/")) {
      this.headerCarouselChanges();
    } else {
      this.headerCommonChanges();
    }
    if((url.includes("list") || url.includes("edit")) || url.includes("add")) {
      this.footerAdminChanges();
    } else {
      this.footerCommonChanges();
    }
  }

  loginIsLoggedChanges():void {
    this._communicationService.loginChanges(this._authService.isLoggedIn());
  }

  subscribeLogin():void {
    this.subscription = this._communicationService.login$.subscribe({
      next: (datos) => {
        this.isLogged = datos;
        if(this.isLogged) {
          this.usuario = this._authService.getUsuario();
          this.rol = this._authService.getRol();
          if(this.rol == 'admin') {
            this.isAdmin = true;
          }
        }
      },
      error: (error) => {},
      complete: () => {}
    });
  }

}
