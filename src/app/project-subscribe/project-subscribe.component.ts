import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { SubscribersService } from '../services/subscribers.service';
import { OCT } from '@angular/material';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

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
    public subscribersService: SubscribersService,
    public afStore : AngularFirestore

  ) {
    this.thanks = this.router.url.includes('thanks');
    firebase.auth().getRedirectResult().then((result) => {
      this.route.params.subscribe(params => {
        var user = result.user;
        let projectDoc = this.afStore.doc<Project>(`projects/${params['id']}`)
        this.projectService.getProject(params['id']).subscribe(project => {
          this.project = project
          if (user != null) {
            this.subscribersService.updateSub(projectDoc, user)
          }else{
            if(params["method"]){
             let subMethod = this.project.availableSubscribeMethods.find(sub => sub.methodName.toLowerCase() == params["method"].toLowerCase() && sub.active)
             if(subMethod)
              this.subscribersService[`doSubscribe${subMethod.methodName}`]() 
          }
        }
        })
        
        

      })
    });
  }

  ngOnInit() {

  }
}


