import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) {}
  
  user: any = {};
  book: Book;

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.getUser(localStorage.getItem('userId'))
        .subscribe((user: User) => {
            this.user = user;
          }
        );
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    if (this.authService.isLoggedIn())
        return this.user.email === 'vukan.markovic97@gmail.com';
    return false;
  }
}