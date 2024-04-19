import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/entity';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  nFases:number = 1;
  loadFases:number = 0;
  loadComplete:boolean = false;
  aDatos:Usuario[] = [];

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
  ) {}

  getData():void {
    this._usuarioService.getUsuarios().subscribe({
      next: (aUsuarios) => {
        this.aDatos = aUsuarios;
      },
      error: (error) => {this._router.navigate(['/error'])},
      complete: () => {this.isLoadComplete()}
    });
  }

  isLoadComplete():void {
    this.loadFases++;
    if(this.loadFases == this.nFases) {
      this.loadComplete = true;
    }
  }
  
  ngOnInit(): void {
    this.getData();
  }


}