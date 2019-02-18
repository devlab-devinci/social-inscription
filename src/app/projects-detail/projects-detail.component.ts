import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { availableSubscribeMethodsInit } from '../models/availableSubscribeMethods'
import { Subscription } from 'rxjs';
import { InjectionToken, FactoryProvider } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.scss']
})
export class ProjectsDetailComponent implements OnInit, OnDestroy {
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

  copyToClipboard(selector) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      let elem = <HTMLInputElement>document.getElementById(selector)
      e.clipboardData.setData('text/plain', (elem.value));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.snackBar.open("Copié dans le presse papier", "Ok", {
      duration: 5000,
    });

  }


  get windowOrigin(){
    return window.location.origin
  }
}
