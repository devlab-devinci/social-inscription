import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public displayedColumns: Array<string>;
  public projects: Observable<Project[]>;

  constructor(
    public projectService: ProjectService,
  ) {
    this.displayedColumns = ['name', 'description', 'actions',]
    this.projects = projectService.getUserProjects();
  }

  ngOnInit() {
  }

  
}
