import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {username:'anusondd@gmail.com',password:'21519097'};
  message:string;
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router
  ) { }

  ngOnInit() {
  }

  login(user:User){
    
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.username,user.password)
                .then(user=>{
                    console.log(user);
                    this.router.navigate(['/user']);
                }).catch(e=>{
                  console.error(e);
                  this.message = e;                                    
                })
                
  }

}
