import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-project-qrcode',
  templateUrl: './project-qrcode.component.html',
  styleUrls: ['./project-qrcode.component.scss']
})
export class ProjectQrcodeComponent implements OnInit, OnDestroy {
  public project: Project;
  public projectSub: Subscription
  public subMethods: Array<any>
  
  
  constructor(
    public route: ActivatedRoute,
    public projectService: ProjectService,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectSub = this.projectService.getProject(params['id']).subscribe(res => {
        this.project = res;
      });
    });
  
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }


  get ProjectSubUrl(){
    return window.location.origin+'/projects/'+this.project.id + '/subscribe/';
  }
}
