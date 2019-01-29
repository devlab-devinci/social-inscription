import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  constructor(public auth: AuthService, public fb: FormBuilder) { }
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email : ['', [
        Validators.required,
        Validators.email
      ]],
      password : ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    });
  }

  doLogin() {
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password);
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
