import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import {availableSubscribeMethodsInit} from '../models/availableSubscribeMethods'

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {
  constructor(public fb : FormBuilder, public projectService : ProjectService) { }  
  
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



  
}
