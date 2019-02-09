import { NgModule } from '@angular/core';
import {MatCheckboxModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatListItem, MatList, MatListModule, MatSlideToggle, MatSlideToggleModule, MatDividerModule, MatDivider, MatListAvatarCssMatStyler} from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatListModule,
  MatSlideToggleModule,
  MatDividerModule
  
  
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatCheckboxModule,
   MatList,
   MatListItem,
   MatListAvatarCssMatStyler,
   MatSlideToggle,
   MatDivider
   ],
})
export class SCMaterialModule { }