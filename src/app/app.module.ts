import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-rout';
import { ApiServiceService } from './service/api-service.service';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { UserService } from './service/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './page/nav/nav.component';
import { ImageUploadModule } from "angular2-image-upload";
import { Ng2ImgMaxModule } from 'ng2-img-max';

import {ButtonModule,SplitButtonModule,AccordionModule} from 'primeng/primeng';
import { LoginComponent } from './page/login/login.component';

import { ApproverService } from './service/approver.service';
import { UploadsService } from './service/uploads.service';
import { SidebarComponent } from './page/sidebar/sidebar.component';
import { PersonalService } from './service/personal.service';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from './service/notify.service';
import { LoadingModule } from 'ngx-loading';
import { UserMenagementComponent } from './page/user-menagement/user-menagement.component';
import { CategoryMenagementComponent } from './page/category-menagement/category-menagement.component';
import { ProjectMenagementComponent } from './page/project-menagement/project-menagement.component';
import { ActicleMenagementComponent } from './page/acticle-menagement/acticle-menagement.component';
import { VideoMenagementComponent } from './page/video-menagement/video-menagement.component';
import { CategoryService } from './service/category.service';
import { ProjectService } from './service/project.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    SidebarComponent,
    UserMenagementComponent,
    CategoryMenagementComponent,
    ProjectMenagementComponent,
    ActicleMenagementComponent,
    VideoMenagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCV4ggjXAljl9NciKcB_AOlHKdJhxfwX5M",
      authDomain: "royolproject-f9706.firebaseapp.com",
      databaseURL: "https://royolproject-f9706.firebaseio.com",
      projectId: "royolproject-f9706",
      storageBucket: "royolproject-f9706.appspot.com",
      messagingSenderId: "832108055817"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ImageUploadModule.forRoot(),
    Ng2ImgMaxModule,
    ToastModule.forRoot(),
    LoadingModule
  ],
  providers: [
    ApiServiceService,
    UserService,
    ApproverService,
    UploadsService,
    PersonalService,
    NotifyService,
    CategoryService,
    ProjectService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
