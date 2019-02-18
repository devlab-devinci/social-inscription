import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SCMaterialModule } from './SCMaterialModule';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MatSnackBar } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { NotAuthGuard } from './auth/notauth.guard';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';
import { ProjectsCreateComponent } from './projects-create/projects-create.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MatGridListModule } from '@angular/material';
import { ProjectSubscribeComponent } from './project-subscribe/project-subscribe.component';
import {WINDOW_PROVIDERS} from './WINDOW_PROVIDER';
import { ProjectQrcodeComponent } from './project-qrcode/project-qrcode.component'
import { NgxQRCodeModule } from 'ngx-qrcode2';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    TopNavComponent,
    ForgottenPasswordComponent,
    ProjectsComponent,
    ProjectsDetailComponent,
    ProjectsCreateComponent,
    ProjectsEditComponent,
    DialogConfirmComponent,
    ProjectSubscribeComponent,
    ProjectQrcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SCMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    MatSnackBarModule,
    AngularFirestoreModule,
    MatGridListModule,
    NgxQRCodeModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard,
    MatSnackBar,
    WINDOW_PROVIDERS,
    

  ],  
  entryComponents: [DialogConfirmComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
