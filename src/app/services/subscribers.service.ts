import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve } from 'q';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(

    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
  ) { }

  public doSubscribeGoogle() {
    firebase.auth().getRedirectResult().then((result) =>  {
      var user = result.user;
      console.log(user)
      if(user != null){
        console.log(user)
        this.updateSubscriberData(user)
        this.route.firstChild.params.subscribe(params => {
          let projectDoc = this.afStore.doc<Project>(`projects/${params['id']}`);
          projectDoc.valueChanges().subscribe(project => {
            if (!project.subscribers.includes(user.uid)) {
                project.subscribers.push(user.uid);
                projectDoc.set(project, { merge: true }).then(res => {
              })
            }
            this.router.navigate([`projects/${params['id']}/thanks`]);
          })
        })
      }else{
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithRedirect(provider);
        })
      }
    })
  }


  private updateSubscriberData(user, displayName?) {

    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);

    
  const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName !== null ? user.displayName : displayName,
      photoURL: user.photoURL,
      roles : []
  }

  userRef.valueChanges().subscribe(res => {
    
  })

    return userRef.set(data, { merge: true })

  }


}

