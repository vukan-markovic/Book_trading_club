import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
  }

  onLogout() {
    this.authService.logout();
    this.flashMessage.show('Logged out!', { cssClass: 'alert-danger', timeout: 3000 });
    this.router.navigate(['/']);
  }
}