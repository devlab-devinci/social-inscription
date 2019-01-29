import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public displayedColumns: Array<string>;
  constructor(
    public projectService: ProjectService
  ) {
      this.displayedColumns = ['name','description','actions',]
  }

  ngOnInit() {
  }

}
