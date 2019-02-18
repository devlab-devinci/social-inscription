import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { resolve } from 'q';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../models/User';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  public project;
  constructor(

    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar,
    public projectService: ProjectService
  ) {

  }

  public doSubscribeGoogle() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      })
  }

  public doSubscribeFacebook() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
      })
  }
  
  public updateSub(projectDoc, user){
    let updateSub = projectDoc.valueChanges().subscribe(project => {
      let projectData = project;
      if (!projectData.subscribers.find(userF => user.email == userF.email)) {
        projectData.subscribers.push({ displayName: user.displayName, email: user.email, subscribedAt: this.timestamp });
      }
      updateSub.unsubscribe()
      console.log(projectData)
      projectDoc.set(projectData, { merge: true }).then(res => {
        console.log(res);
        this.afAuth.auth.signOut().then(() => {
          this.route.firstChild.params.subscribe(params =>{
          this.router.navigate([`projects/${params['id']}/thanks`]);
        })
        });
      })
    })
  }
  get timestamp() {
    return new Date()
  }

}

