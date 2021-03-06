import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { resolve } from 'q';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from "../models/User"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  authState: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  googleLogin() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await firebase.auth().signInWithPopup(provider);
        resolve(res);
        this.updateUserData(res.user)
        this.router.navigate(['/projects']);
      })
      .catch((error) => {
        this.processErrors(error)
      });
  }

  login(emailLogin: string, passwordLogin: string): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const res = await firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin);
        resolve(res).then(() => {
          this.router.navigate(['/projects']);
        });
      })
      .catch((error) => {
        this.processErrors(error)
      });
  }

  register(userForm): any {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {

        const res = await firebase.auth().createUserWithEmailAndPassword(userForm.email, userForm.password);
        resolve(res);

        const displayName = `${userForm.surname} ${userForm.name}`
        this.updateUserData(res.user, displayName)
        this.router.navigate(['/projects']);
      })
      .catch((error) => {
        this.processErrors(error)
      });
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.processErrors({
        code: 'sc/password-reset-sent',
        message: `Un mail vous à été envoyer à : ${email}`
      })
    }).catch(error => {
      this.processErrors(error)
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }


  private updateUserData(user, displayName?) {

    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName !== null ? user.displayName : displayName,
      photoURL: user.photoURL,
      projects: user.projects !== undefined ? user.projects : {
        MZnPTrM6xjpJAgSbhqfo: true
      }
    }

    return userRef.set(data, { merge: true })

  }


  processErrors(error) {
    let errorString = "";
    switch (error.code) {
      case "auth/user-not-found":
        errorString = "Aucun utilisateur ne coresspond à cette adresse mail";
        break;
      case "auth/wrong-password":
        errorString = "Le mot de passe est incorrect";
        break;
      default:
        errorString = error.message;
    }

    this.snackBar.open(errorString, "Ok", {
      duration: 5000,
    });

  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns an observable of our user status
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

}
