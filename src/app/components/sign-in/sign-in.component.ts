import { Component } from '@angular/core';
import { Credentials, Usuario } from '../../models/entity';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  usuario:Usuario = {
    user: "",
    email: "",
    password: ""
  }

  signInForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private _usuarioService:UsuarioService,
    private _route:Router
  ){}

  signIn():void {
    if(this.signInForm.valid) {
      this.usuario.user = this.signInForm.get('user')?.value || "";
      this.usuario.email = this.signInForm.get('email')?.value || "";
      this.usuario.password = this.signInForm.get('password')?.value || "";
      this._usuarioService.addUsuario(this.usuario).subscribe({
        next: () => {},
        error: (error) => {this._route.navigate(["/error"])},
        complete: () => {
          localStorage.setItem('username', this.usuario.email);
          localStorage.setItem('password', this.usuario.password);
          this._route.navigate(["/login"]);
        }
      })
    }
  }
}
