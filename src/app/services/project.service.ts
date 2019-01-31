import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  project: Observable<Project>;
  constructor(
    public afStore: AngularFirestore,
    public afAuth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.projectsCollection = this.afStore.collection('projects', ref => ref.where("members", "array-contains", this.afAuth.authState.uid));
  }

  getUserProjects(){
    return this.projectsCollection.snapshotChanges().pipe(
      map(actions => actions.map(data => {
        const project = data.payload.doc.data() as Project
        const id = data.payload.doc.id
        return {id, ...project}
      }))
    );
  }

  public createProject(project) {
    //TODO : Add the possibilty to add memebers to a projects when creating it
    project.members = [
      this.afAuth.authState.uid,
      ...project.members
    ];
    this.projectsCollection.add({
      createdAt: this.timestamp,
      updatedAt: this.timestamp,
      creator: this.afAuth.authState.uid,
      subscribers: [],
      ...project
    }).then(res => {
      this.router.navigate([`/projects/${res.id}`])
    })
  }

  deleteProject(project_id:string){
      let projectDoc = this.afStore.doc<Project>(`projects/${project_id}`)
      projectDoc.delete();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }


}
