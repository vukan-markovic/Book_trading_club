import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  re: any;

  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

  ngOnInit() {
    this.re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.{2,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        ]),
        lastName: new FormControl(null, [
            Validators.required,
            Validators.pattern("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$")
        ]),
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.re)
        ]),
        password: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        postalCode: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required)
    });
}

onSubmit() {
    const user = new User(
        this.form.value.email,
        this.form.value.password,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.country,
        this.form.value.city,
        this.form.value.postalCode,
        this.form.value.address,
        this.form.value.phoneNumber
    );

    this.authService.register(user)
        .subscribe(data => {
                  console.log(data)
                  this.flashMessage.show('Registered!', { cssClass: 'alert-success', timeout: 3000 });
                  this.router.navigate(['/login']);
                },
            error => console.error(error));

    this.form.reset();
  }

  login () {
      this.router.navigate(['/login']);
  }
}