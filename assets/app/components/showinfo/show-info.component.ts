import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html'
})

export class ShowInfoComponent implements OnInit {
  public user: any = {};
 
  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit () {
    if(this.authService.isLoggedIn()) {
    this.authService.getUser(this.route.snapshot.params['id'])
      .subscribe((user: User) => {
          this.user = user;
        }
      );
    }
  }
}