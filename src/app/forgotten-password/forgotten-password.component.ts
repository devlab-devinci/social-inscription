import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  constructor(public auth : AuthService, public fb : FormBuilder) { }

  passwordResetFrom : FormGroup;
  ngOnInit() {
    this.passwordResetFrom = this.fb.group({
      email : ['', [
        Validators.email,
        Validators.required
      ]]
    })
  }


  doSendResetPasswordLink(){
    this.auth.resetPassword(this.passwordResetFrom.get('email').value)
  }

  get email(){
    return this.passwordResetFrom.get('email');
  }

}
