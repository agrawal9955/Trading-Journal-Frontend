import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TradingJournal';

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ){}

  ngInit(){
    // if(this.storageService.isLoggedIn()) this.router.navigate(['/home']);
    // else this.router.navigate(['/login']);
  }
}
