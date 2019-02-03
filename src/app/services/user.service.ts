import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { resolve } from 'q';
import {AuthService} from '../auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take, reduce } from 'rxjs/operators';
import {User} from "../models/User.model";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<Project>;
  users: Observable<User[]>;
  user: Observable<User>;

  constructor(
    public router : Router,
    public afStore: AngularFirestore,
    public afAuth: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ){
    this.usersCollection = this.afStore.collection('users', ref => ref);
  }



  //Ici c'est pas mal mais t'as un soucis, la tu lui dis "si tu existe pas, retoure moi ça"
  getMember(uid) {
    return this.usersCollection.doc(uid).get().pipe(
      map(res => {
        return {... res.data() as User, id : res.id}
      })
    )
  }

  getMembers() {
    return this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(data => {
        const project = data.payload.doc.data() as Project
        const id = data.payload.doc.id
        return { id, ...project }
      }))
    );
  }
 /*
  doesUserExists(email : string) : boolean {
    return this.afStore.collection('users', ref => ref.orderByChild('email').equalTo(email))
      .pipe(map(users => users
        .map(user => user.exists)
        .reduce((accu, user) => user), false));

  }
*/
  getMemberByEmail(email){
      return this.afStore.collection('users', ref => ref.where('email',  '==', email)).snapshotChanges().pipe(
        map(actions => actions.map(data => {
          return  data.payload.doc.exists && { id : data.payload.doc.id, ...data.payload.doc.data() as User }
        }))
      )
      
  }








}
