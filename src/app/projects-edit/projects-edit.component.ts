import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { availableSubscribeMethodsInit } from '../models/availableSubscribeMethods'
import {NgForm} from '@angular/forms';
import {UserService} from "../services/user.service";
import {map} from "rxjs/operators";
import {User} from "../models/User.model";

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  addMember: FormGroup;
  subMethods: any;
  public project;
  public projectSub: Subscription;
  public usersProject : object[] = [] ;


  constructor(
    public fb: FormBuilder,
    public projectService: ProjectService,
    public userService: UserService,
    public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectSub = this.projectService.getProject(params['id']).subscribe(res => {
        this.project =  res;


        res.members.forEach((uid) => {
          this.userService.getMember(uid).subscribe(res => {
            this.usersProject.push(res);
          });
        });
        console.log(this.usersProject);

        this.subMethods = availableSubscribeMethodsInit;
        const availableSubscribeMethodsInitControls = availableSubscribeMethodsInit.map((c, index) => {
          return new FormControl(this.project.availableSubscribeMethods[index])
        });
        this.projectForm = this.fb.group({
          name: [this.project.name, [
            Validators.required,
          ]],
          description: [this.project.description, [
            Validators.required,
          ]],
          availableSubscribeMethods: new FormArray(availableSubscribeMethodsInitControls),
          members: [[], []]
        })



          this.addMember = new FormGroup({
              email: new FormControl( 'text',[ Validators.required, Validators.email ])
          });
      })
    })
  }

  ngOnInit() {

  }


  ngOnDestroy() {
    this.projectSub.unsubscribe() ;
  }



  addMemberProject(form: NgForm) {
    this.projectService.addMember(form.value['email'], this.project);
  }

  deleteMemberProject(email:string){
    this.projectService.deleteMember(email, this.project);
  }

  public editProject() {
    this.projectService.editProject(this.projectForm.value, this.project.id);
  }

  get name() {
    return this.projectForm.get('name')
  }

  get description() {
    return this.projectForm.get('description')
  }
  get availableSubscribeMethodsInit() {
    return this.projectForm.get('availableSubscribeMethodsInit')
  }



}
