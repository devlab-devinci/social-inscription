import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { resolve } from 'q';
import {MatSnackBar} from '@angular/material';
import {User} from '../models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  resetPassword(value: any): any {
    firebase.auth().sendPasswordResetEmail(value).then(()=>{
      this.processErrors({
        code : 'sc/password-reset-sent',
        message : `Un mail vous à été envoyer à : ${value}`
      })
    }).catch(error => {
      this.processErrors(error)
    })
  }
  constructor(public afAuth : AngularFireAuth, public router : Router, private zone: NgZone, public snackBar : MatSnackBar) { 
    
  }
  googleLogin() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await firebase.auth().signInWithPopup(provider);
      resolve(res);
      this.router.navigate(['/user']);
    })
    .catch((error) => {
      this.processErrors(error)
    });

  }

  login(emailLogin: string, passwordLogin: string): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const res = await firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin);
      resolve(res).then((result) => {
        console.log(result, "k  k ");
        let user = new User();
        this.router.navigate(['/user']);
      });
    })
    .catch((error) => {
        this.processErrors(error)
    });
  }

  register(emailRegister: any, passwordRegister: any): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const res = await firebase.auth().createUserWithEmailAndPassword(emailRegister, passwordRegister);
      resolve(res);
      this.router.navigate(['/user']);
    })
    .catch((error) => {
      this.processErrors(error)
    }); 
  }


  processErrors(error){
    let errorString = "";
    switch (error.code) {
      case "auth/user-not-found" : 
          errorString = "Aucun utilisateur ne coresspond à cette adresse mail";
          break;
      case "auth/wrong-password" : 
          errorString = "Le mot de passe est incorrect";
          break; 
      default : 
        errorString = error.message;
    }

    this.snackBar.open(errorString, "Ok", {
      duration: 5000,
    });
  
  }


  signOut(){
    this.afAuth.auth.signOut().then(() => {
     this.router.navigate(['/login']);
    });
    
  }

  get isUserAuthenticated(): any {
    return this.afAuth.user !== null;
  }

  get user() : any {
    return this.afAuth.user
  }

}
