import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  isVisibleCarousel:boolean = true;

  constructor(
    private _communicationService:CommunicationService,
    private _router:Router
    ) {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this._communicationService.header$.subscribe({
      next: (datos) => {this.isVisibleCarousel = datos},
      error: (error) => {},
      complete: () => {}
    })
  }

}
