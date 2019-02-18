import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotAuthGuard } from './auth/notauth.guard';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectSubscribeComponent } from './project-subscribe/project-subscribe.component';
import { ProjectQrcodeComponent } from './project-qrcode/project-qrcode.component';

const routes: Routes = [
  { path: '', redirectTo : '/login', pathMatch:'full', canActivate : [NotAuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},


  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'projects/new', component: ProjectsCreateComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id', component: ProjectsDetailComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id/qrcode', component: ProjectQrcodeComponent, canActivate: [AuthGuard]},
  { path: 'projects/:id/edit', component: ProjectsEditComponent, canActivate: [AuthGuard]},

  { path: 'projects/:id/subscribe', component: ProjectSubscribeComponent},
  { path: 'projects/:id/subscribe/:method', component: ProjectSubscribeComponent},
  { path: 'projects/:id/thanks', component: ProjectSubscribeComponent},




  { path: 'login', component: LoginComponent, canActivate : [NotAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate : [NotAuthGuard]},
  { path: 'forgotten-password', component: ForgottenPasswordComponent, canActivate : [NotAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


  
  
}
