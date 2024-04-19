import { Component } from '@angular/core';
import { Credentials } from '../../models/entity';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// NO OLVIDAR importar el ReactiveFormModules

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email:string|null = null;
  password:string|null = null;
  credentials:Credentials = {
    username: "",
    password: ""
  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(
    private _authService:AuthService,
    private _router:Router
  ){}

  ngOnInit() {
    this.getParams();
    if(this.email != null && this.password != null) {
      this.loginForm.setValue({username: this.email, password: this.password});
    }
  }

  getParams():void {
    if(localStorage.getItem('username') != null && localStorage.getItem('password') != null) {
      this.email = localStorage.getItem('username');
      this.password = localStorage.getItem('password');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }

  login():void {
    if(this.loginForm.valid) {
      this.credentials.username = this.loginForm.get('username')?.value || "";
      this.credentials.password = this.loginForm.get('password')?.value || "";
      this._authService.login(this.credentials).subscribe({
        next: (token) => {this._authService.setTokenInLocalStorage(token.jwt)},
        error: (error) => {this._router.navigate(['/error'])},
        complete: () => {this._router.navigate(['/home'])}
      });
    }
  }

}
