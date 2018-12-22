import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';

const routes: Routes = [
  { path: '', redirectTo : '/login', pathMatch:'full'},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotten-password', component: ForgottenPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
