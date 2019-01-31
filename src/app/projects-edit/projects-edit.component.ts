import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { availableSubscribeMethodsInit } from '../models/availableSubscribeMethods'

@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.scss']
})
export class ProjectsEditComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  subMethods: any;
  public project;
  public projectSub: Subscription

  constructor(
    public fb: FormBuilder,
    public projectService: ProjectService,
    public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectSub = this.projectService.getProject(params['id']).subscribe(res => {
        this.project =  res;

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
      })
    })
  }

  ngOnInit() {
    console.log(this.projectForm)
  }


  ngOnDestroy() {
    this.projectSub.unsubscribe()
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
