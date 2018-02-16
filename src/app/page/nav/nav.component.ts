import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router
  )  { }

  ngOnInit() {
  }

  logOut(){
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}
