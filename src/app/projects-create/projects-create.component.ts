import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.scss']
})
export class ProjectsCreateComponent implements OnInit {
  constructor(public fb : FormBuilder, public projectService : ProjectService) { }  
  availableSubscibeMethodsInit = [{
      iconName : "google",
      label : "Google"
    },
    {
      iconName : "facebook",
      label : "Facebook"
    },
  ]
  projectForm : FormGroup;
  ngOnInit() {
    const availableSubscibeMethodsControls = this.availableSubscibeMethodsInit.map(c => new FormControl(false));

    this.projectForm = this.fb.group({
      name : ['', [
        Validators.required,
      ]],
      description : ['', [
        Validators.required,
      ]],
      availableSubscibeMethods : new FormArray(availableSubscibeMethodsControls),
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
  get availableSubscibeMethods(){
    return this.projectForm.get('availableSubscibeMethods')
  }



  
}
