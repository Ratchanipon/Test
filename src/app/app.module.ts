import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeroesComponent } from './page/heroes/heroes.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-rout';
import { IronmarnComponent } from './page/ironmarn/ironmarn.component';
import { ApiServiceService } from './service/api-service.service';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ContentComponent } from './page/content/content.component';
import { UserComponent } from './page/user/user.component';
import { UserService } from './service/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './page/nav/nav.component';

import {ButtonModule,SplitButtonModule,AccordionModule} from 'primeng/primeng';
import { LoginComponent } from './page/login/login.component';
import { ApproverComponent } from './page/approver/approver.component';
import { ApproverService } from './service/approver.service';
import {NotificationsModule, NotificationsService} from 'angular4-notify';
import { EditApproverComponent } from './page/edit-approver/edit-approver.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    IronmarnComponent,
    ContentComponent,
    UserComponent,
    NavComponent,
    LoginComponent,
    ApproverComponent,
    EditApproverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyBM0RzKCpN-wuGueTi5KjSaSFQgR3p1Kug",
        authDomain: "blockchain-a.firebaseapp.com",
        databaseURL: "https://blockchain-a.firebaseio.com",
        projectId: "blockchain-a",
        storageBucket: "blockchain-a.appspot.com",
        messagingSenderId: "209725170616"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NotificationsModule,
  ],
  providers: [
    ApiServiceService,
    UserService,
    ApproverService,
    NotificationsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
