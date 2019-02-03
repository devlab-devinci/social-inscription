import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
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
    private userService: UserService
  ) {
    this.projectsCollection = this.afStore.collection('projects', ref => ref.where("members", "array-contains", this.afAuth.authState.uid));
  }

  getUserProjects() {
    return this.projectsCollection.snapshotChanges().pipe(
      map(actions => actions.map(data => {
        const project = data.payload.doc.data() as Project
        const id = data.payload.doc.id
        return { id, ...project }
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

  public async editProject(project, project_id, newMembre_id = null) {
    //TODO : Add the possibilty to add memebers to a projects when creating it
    if(newMembre_id != null){
      project.members.push(newMembre_id);
    }

    await this.afStore.doc<Project>(`projects/${project_id}`).set({
      createdAt: this.timestamp,
      updatedAt: this.timestamp,
      creator: this.afAuth.authState.uid,
      subscribers: [],
      ...project
    })
    this.router.navigate([`/projects/${project_id}`])


  }

  deleteProject(project_id: string) {
    let projectDoc = this.afStore.doc<Project>(`projects/${project_id}`)
    projectDoc.delete();
  }

  getProject(project_id: string) {
    return this.projectsCollection.doc(project_id).get().pipe(
      map(res => {
        if(!res.exists)
          this.router.navigate(['/projects'])
        return {... res.data() as Project, id : res.id}
      })
     )
    //return this.projectsCollection.doc(project_id).valueChanges();
  }

  addMember(email: string, project: Project) {
      const user = this.userService.getMemberByEmail(email);
      if(user != null){
        this.editProject(project, project.id, user );
      }
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
