import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { SubscribersService } from '../services/subscribers.service';
import { OCT } from '@angular/material';

@Component({
  selector: 'app-project-subscribe',
  templateUrl: './project-subscribe.component.html',
  styleUrls: ['./project-subscribe.component.scss']
})
export class ProjectSubscribeComponent implements OnInit {

  public project: Project;
  public projectSub: Subscription
  public subMethods: Array<any>;
  public thanks: Boolean = false;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public projectService: ProjectService,
    public subscribersService: SubscribersService

  ) {

    this.route.params.subscribe(params => {
      this.thanks = this.router.url.includes('thanks')
      this.projectSub = this.projectService.getProject(params['id']).subscribe(res => {
        this.project = res;
        
        if (params['method']) {
          this.doSubscribe(this.project.availableSubscribeMethods.find(sub => {
            return sub.methodName.toLowerCase() == params['method'].toLowerCase() && sub.active
          }))
        }
      });
    });
  }

  ngOnInit() {

  }

  public doSubscribe(subMethod) {
    if (subMethod)
      this.subscribersService[`doSubscribe${subMethod.methodName}`]();
  }
}


