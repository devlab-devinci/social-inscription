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

  public async editProject(project, project_id, newUserMember = null) {

    if(newUserMember != null){
      project.members = newUserMember;
    }

    await this.afStore.doc<Project>(`projects/${project_id}`).set({
      updatedAt: this.timestamp,
      creator: this.afAuth.authState.uid,
      subscribers: [],
      ...project
    })

    if(newUserMember == null){
      this.router.navigate([`/projects/${project_id}`])
    } else {
      this.router.navigate([`/projects/${project_id}/edit`])
    }
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


  public addMember(email: string, project: Project) {
    const userSub  = this.userService.getMemberByEmail(email);

    userSub.subscribe(res =>
    {

      if(res.length == 0){
        /**
         * Affiche ton un message d'erreur todo
         */
        console.log('membre innexistant');
        return;
      }

      return res.map(
        async user => {
          if(project.members.indexOf(user['uid']) > -1){
            /**
             * Message erreur todo
             */
            console.log('membre déjà dans le projet');
            return;
          }
          const newMembers = [];
          project.members.forEach( (member)=> {
            newMembers.push(member.uid);
          });
          newMembers.push(user['uid']);

          this.editProject(project, project.id,  newMembers );
        })
    })

  }


  public deleteMember(email: string, project: Project) {
    console.log(email);
    console.log(project);

    const userSub  = this.userService.getMemberByEmail(email);

    userSub.subscribe(res =>
    {

      if(res.length == 0){
        /**
         * Affiche ton un message d'erreur todo
         */
        console.log('membre innexistant');
        return;
      }

      return res.map(
        async user => {

          if( project.members.indexOf(user['uid']) != -1 ){
            /**
             * Message erreur todo
             */
            console.log('membre pas dans le projet');
            return;
          }


          var saveMember = [];

          project.members.forEach(function (member) {
            if( member.uid != user['uid']){

              saveMember.push(member['uid']);
            }
          });

          this.editProject(project, project.id, saveMember );
        })
    })

  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
