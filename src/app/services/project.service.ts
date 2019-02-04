import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';

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
    if (newMembre_id != null) {
      project.members.push(newMembre_id);
    }

    await this.afStore.doc<Project>(`projects/${project_id}`).set({
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
        if (!res.exists)
          this.router.navigate(['/projects'])
        const project_data = res.data() as Project;
        project_data.members = this.userService.getMembersByArray(project_data.members);
        project_data.subscribers = this.userService.getMembersByArray(project_data.subscribers);
        return {
          ...project_data,
          id: res.id
        }
      })
    )
    //return this.projectsCollection.doc(project_id).valueChanges();
  }


  addMember(email: string, project: Project) {
    const userSub = this.userService.getMemberByEmail(email);
    userSub.subscribe(res => {
      if (res.length == 0) {
        /**
         * Affiche ton un message d'erreur
         */
        return;
      }

      return res.map(
        user => {
          this.projectsCollection.doc(project.id).update({
            "members" : [...project.members.map(res => res.uid), user.uid]
          })
          //this.editProject(project, project.id, user);
        })
    })

  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
