import { Component } from '@angular/core';
import { User } from './interfaces/User';
import { AuthenticationService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-scafolding';
  userLogged$: boolean = localStorage.getItem('userLogged') ? true : false;

  constructor(private authService: AuthenticationService) {
    this.authService.userLogged.subscribe((value) => this.userLogged$ = value);
  }
}
