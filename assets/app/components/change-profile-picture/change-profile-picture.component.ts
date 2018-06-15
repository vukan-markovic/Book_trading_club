import { Component, OnInit, ViewChild } from '@angular/core';;
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})

export class ChangeProfilePictureComponent implements OnInit {
    user: any = {};
    @ViewChild('f') form: NgForm;

    constructor(private router: Router, private authService: AuthService, 
                private flashMessage: FlashMessagesService) {}

    ngOnInit () {
        if (this.authService.isLoggedIn())
        {
            this.authService.getUser(localStorage.getItem('userId'))
                .subscribe((user: User) => {
                    this.user = user;
                }
            );
        }
        else this.router.navigate(['/login']);
    }

    onSubmit () {
        this.user.image = this.form.value.image;
        this.authService.changeProfilePicture(this.user)
                .subscribe((user: User) => {
                        this.user = user;
                        this.router.navigate(['/profile']);
                        this.flashMessage.show('Profile picture changed', { cssClass: 'alert-warning', timeout: 3000 });
                    }
                );
    }
}