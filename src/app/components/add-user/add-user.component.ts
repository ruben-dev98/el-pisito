import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/entity';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  
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
        next: (datos) => {},
        error: (error) => {this._route.navigate(["/error"])},
        complete: () => {
          this._route.navigate(["/list-user"]);
        }
      })
    }
  }
}
