import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})

export class NavMainComponent implements OnDestroy, OnInit {
  
  subscription:Subscription;
  isLogged:boolean = true;
  isAdmin:boolean = false;
  user:string;
  rol:string;
  id:number;

  constructor(
    private _communicationService:CommunicationService,
    private _authService:AuthService,
    private _router:Router
    ) {

  }

  logout():void {
    this.isLogged = false;
    this.isAdmin = false
    this._authService.logout();
    this._communicationService.loginChanges(false);
    this._router.navigate(["/home"]);
  }

  toUpperCase(user:string):string {
    return user.charAt(0).toLocaleUpperCase().concat(user.substring(1));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this._communicationService.login$.subscribe({
      next: (datos) => {
        this.isLogged = datos;
        if(this.isLogged) {
          this.user = this._authService.getUsuario();
          this.rol = this._authService.getRol();
          this.id = this._authService.getId();
          if(this.rol == 'admin') {
            this.isAdmin = true;
          }
        }
      },
      error: (error) => {},
      complete: () => {}
    })
  }
}
