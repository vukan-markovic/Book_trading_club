import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  public users: User[] = [];
 
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit () {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    else {
      this.authService.getUsers()
        .subscribe((users: User[]) => {
            this.users = users;
          }
        );
    }
  }

  isAdmin (user: User) {
    return user.email === "vukan.markovic97@gmail.com";
  }
}