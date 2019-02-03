import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { availableSubscribeMethodsInit } from '../models/availableSubscribeMethods'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit, OnDestroy {
  public project: Project;
  public projectSub: Subscription
  public subMethods: Array<any>;
  constructor(
    public route: ActivatedRoute,
    public projectService: ProjectService,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectSub = this.projectService.getProject(params['id']).subscribe(res => {

        this.project = {
          ...res,
          availableSubscribeMethods : res.availableSubscribeMethods.map((val, index) => {
            return {
              active: val,
              ...availableSubscribeMethodsInit[index]
            }
          })
        };
        console.log(this.project)
      });
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
}
