import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { availableSubscribeMethodsInit } from '../models/availableSubscribeMethods'
import { FlashMessage } from "../services/flashMessage.service";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private projectsCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  project: Observable<Project>;
  constructor(
    public flashMessage: FlashMessage,
    public afStore: AngularFirestore,
    public afAuth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    if (this.router.url.includes('subscribe')) {
      this.projectsCollection = this.afStore.collection('projects');
    } else {
      this.projectsCollection = this.afStore.collection('projects', ref => ref.where("members", "array-contains", this.afAuth.authState.uid));
    }
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
    console.log(project);
    if (newUserMember != null) {
      project.members = newUserMember;
    }

    await this.afStore.doc<Project>(`projects/${project_id}`).set({
      updatedAt: this.timestamp,
      creator: this.afAuth.authState.uid,
      subscribers: [],
      ...project
    })

    if (newUserMember == null) {
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

        project_data.availableSubscribeMethods = project_data.availableSubscribeMethods.map((val, index) => {
          return {
            active: val,
            ...availableSubscribeMethodsInit[index]
          }
        })


        return {
          ...project_data,
          id: res.id
        }
      })
    )
    //return this.projectsCollection.doc(project_id).valueChanges();
  }


  public addMember(email: string, project: Project) {

    const userSub = this.userService.getMemberByEmail(email);

    userSub.subscribe(res => {

      if (res.length == 0) {
        this.flashMessage.setMessage('Le membre n\'existe pas');
        return;
      }

      return res.map(
        async user => {


          const newMembers = [];
          project.members.forEach((member) => {

            newMembers.push(member.uid);
          });

          if ( newMembers.indexOf(user['uid']) > -1) {
            this.flashMessage.setMessage('Le membre est déjà dans le projet');
            return;
          }

          newMembers.push(user['uid']);

          this.editProject(project, project.id, newMembers);
          return true;
        })
    })

  }

  openConfirm(project_id: string) {
    const confirmRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: "Estes-vous sur de vouloir supprimer cette élément ?",
        message: "La supression d'un projet est définitive"
      }
    });

    confirmRef.afterClosed().subscribe(bool => {
      if (bool) {
        this.deleteProject(project_id);
      }
    });
  }

  public deleteMember(email: string, project: Project) {

    const userSub = this.userService.getMemberByEmail(email);

    userSub.subscribe(res => {

      if (res.length == 0) {
        this.flashMessage.setMessage('Le membre n\'existe pas');
        return;
      }

      return res.map(
        async user => {

          if (project.members.indexOf(user['uid']) != -1) {
            this.flashMessage.setMessage('Le membre n\'est pas dans le projet');
            return;
          }


          var saveMember = [];

          project.members.forEach(function (member) {
            if (member.uid != user['uid']) {

              saveMember.push(member['uid']);
            }
          });

          this.editProject(project, project.id, saveMember);
        })
    })

  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
