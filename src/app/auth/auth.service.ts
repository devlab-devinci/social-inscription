import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { resolve } from 'q';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth : AngularFireAuth, public router : Router, private zone: NgZone,) { 
    
  }
  googleLogin() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await firebase.auth().signInWithPopup(provider);
      resolve(res);
      this.router.navigate(['/user']);
    })
    .catch(function(error) {
      console.log(error);
    });

  }

  login(emailLogin: string, passwordLogin: string): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const res = await firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin);
      resolve(res).then(() => {
        this.router.navigate(['/user']);
      });
    })
    .catch(function(error) {
      alert(error.toString())
    });
  }
  register(emailRegister: any, passwordRegister: any): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(async () => {
      const res = await firebase.auth().createUserWithEmailAndPassword(emailRegister, emailRegister);
      resolve(res);
      this.router.navigate(['/user']);
    })
    .catch(function(error) {
      console.log(error);
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
