import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public displayedColumns: Array<string>;
  constructor(
    public projectService: ProjectService,
    public dialog : MatDialog
  ) {
      this.displayedColumns = ['name','description','actions',]
  }

  ngOnInit() {
  }


  openConfirm(project_id : string){
      const confirmRef = this.dialog.open(DialogConfirmComponent, {
        data : {
          title : "Estes-vous sur de vouloir supprimer cette élément ?",
          message : "La supression d'un projet est définitive"
        }
      });
      
      confirmRef.afterClosed().subscribe(bool => {
          if(bool){
            this.projectService.deleteProject(project_id);
          }
      });

  }

}
