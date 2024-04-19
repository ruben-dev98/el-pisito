import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  
  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  id:number;
  isAdmin:boolean = false;
  usuario:Usuario = {
    id: 0,
    user: "",
    email: "",
    password: "",
    rol: "",
    activo: 0
  }

  editForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    activo: new FormControl('', [Validators.required])
  });

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router,
    private _activatedRoute:ActivatedRoute,
    private _authService:AuthService
  ){}

  getData():void {
    this._usuarioService.getUsuario(this.id).subscribe({
      next: (data) => {this.usuario = data/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])},
      complete: () => {this.isLoadComplete(); this.paintForm();}
    });
  }

  paintForm():void {
    this.editForm.setValue({
      user: this.usuario.user,
      password: "",
      rol: this.usuario.rol || "",
      activo: this.usuario.activo?.toString() || "0"
    });
  }

  isRestricted():void {
    if(this._authService.getRol() == 'admin') {
      this.isAdmin = true;
    }
  }

  getParams():void {
    this._activatedRoute.params.subscribe({
      next: (params) => {this.id = params["id"]/*this.tipo = tipoNew*/},
      error: (error) => {this._router.navigate(["/error"])}
    });
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }

  edit():void {
    if(this.editForm.valid) {
      this.usuario.user = this.editForm.get('user')?.value || "";
      this.usuario.password = this.editForm.get('password')?.value || this.usuario.password;
      this.usuario.rol = this.editForm.get('rol')?.value || "ROLE_USER";
      this.usuario.activo = Number.parseInt(this.editForm.get('activo')?.value || "1");
      this._usuarioService.updateUsuario(this.usuario).subscribe({
        next: (datos) => {},
        error: (error) => {this._router.navigate(["/error"])},
        complete: () => {if(this.isAdmin)this._router.navigate(["/list-users"]); else this._router.navigate(["/home"]);}
      })
    }
  }

  ngOnInit():void {
    this.getParams();
    this.getData();
    this.isRestricted();
  }
}
