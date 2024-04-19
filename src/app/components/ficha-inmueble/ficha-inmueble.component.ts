import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { Inmueble } from '../../models/entity';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha-inmueble',
  templateUrl: './ficha-inmueble.component.html',
  styleUrl: './ficha-inmueble.component.css'
})
export class FichaInmuebleComponent {
  @Input() dato:Inmueble;
}
