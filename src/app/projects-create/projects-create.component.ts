import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray, NgForm} from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import {availableSubscribeMethodsInit} from '../models/availableSubscribeMethods'
import {AuthService} from "../auth/auth.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {

  constructor(public fb : FormBuilder, public projectService : ProjectService, public userService : UserService ,  public afAuth: AuthService) { }
  creator = this.afAuth.authState;
  memberProject =  [this.creator];
  projectForm : FormGroup;
  subMethods: any;
  ngOnInit() {
    this.subMethods = availableSubscribeMethodsInit;
    const availableSubscribeMethodsInitControls = availableSubscribeMethodsInit.map(c => new FormControl(false));

    this.projectForm = this.fb.group({
      name : ['', [
        Validators.required,
      ]],
      description : ['', [
        Validators.required,
      ]],
      availableSubscribeMethods : new FormArray(availableSubscribeMethodsInitControls),
      members : [[], []]
    })
  }

public async createProject(){
  this.projectService.createProject(this.projectForm.value);
} 

  get name(){
    return this.projectForm.get('name')
  }

  get description(){
    return this.projectForm.get('description')
  }
  get availableSubscribeMethodsInit(){
    return this.projectForm.get('availableSubscribeMethodsInit')
  }

  addMemberProject(form: NgForm) {
    const user = this.userService.getMemberByEmail(form.value['email']);

    user.subscribe(res => {
      if(res.length == 0){
        /**
         * Affiche ton un message d'erreur todo
         */
        console.log('membre innexistant');
        return;
      }

      return res.map(
        async user => {
          var check = 1;
          this.memberProject.forEach(member => {
            if(member.uid == user.uid){
              console.log('membre déjà dans le projet');
              check = 0;
            }
          });
          if(check){
            this.memberProject.push(user);
          } else {
            //TODO
          }
        })
    })

  }

  deleteMemberProject(member){

     if(member.uid == this.creator.uid){
       console.log('impossible de supprimer le créateur d un projet');
       return;
     }
     const newArray = [];
     this.memberProject.forEach( (user) => {
        if(member != user){
          newArray.push(user);
        }
     })
    this.memberProject = newArray;
  }
}
