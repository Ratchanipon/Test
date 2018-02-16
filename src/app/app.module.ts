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

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    IronmarnComponent,
    ContentComponent,
    UserComponent,
    NavComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC8idP11oFEzShOf18qDt8DVJycUZzmCeA",
      authDomain: "palm-zcash.firebaseapp.com",
      databaseURL: "https://palm-zcash.firebaseio.com",
      projectId: "palm-zcash",
      storageBucket: "palm-zcash.appspot.com",
      messagingSenderId: "790859641229"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [ApiServiceService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
