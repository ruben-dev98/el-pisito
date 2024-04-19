import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../../services/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {
  
  subscription:Subscription;
  isVisibleFooter:boolean = true;

  constructor(
    private _communicationService:CommunicationService,
    private _router:Router
    ) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this._communicationService.footer$.subscribe({
      next: (datos) => {this.isVisibleFooter = datos},
      error: (error) => {},
      complete: () => {}
    })
  }
}
