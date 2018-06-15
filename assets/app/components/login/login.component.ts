import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }


    onSubmit() {
        const user = new User(this.form.value.email, this.form.value.password);
        this.authService.login(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.flashMessage.show('Logged in!', { cssClass: 'alert-success', timeout: 3000 });
                    this.router.navigateByUrl('/');
                },
                error => {
                    this.flashMessage.show('Invalid email or/and password!', { cssClass: 'alert-danger', timeout: 3000 });
                    console.error(error)
                }
            );
        this.form.reset();
    }

    register() {
        this.router.navigate(['/register']);
    }
}