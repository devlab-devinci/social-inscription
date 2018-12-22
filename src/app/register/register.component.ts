import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { passwordMatchValidator } from './same-password.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message:string;
  constructor(public auth : AuthService, public fb : FormBuilder) { }  
  registerForm : FormGroup;
  ngOnInit() {
    this.registerForm = this.fb.group({
      surname : ['', []],
      name : ['', []],
      email : ['', [
        Validators.required,
        Validators.email
      ]],
      password : ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      password_conf : ['', [
        Validators.required,
        passwordMatchValidator()
      ]],
      rgpd_check : ['', [
        Validators.requiredTrue,
      ]],
    })
  }

  doRegister(){
    this.auth.register(this.registerForm.value.email, this.registerForm.value.password)
  }

  get name(){
    return this.registerForm.get('name')
  }
  get email(){
    return this.registerForm.get('email')
  }

  get password(){
    return this.registerForm.get('password')
  }

  get password_conf(){
    return this.registerForm.get('password_conf')
  }

  get rgpd_check(){
    return this.registerForm.get('rgpd_check')
  }
 
}
