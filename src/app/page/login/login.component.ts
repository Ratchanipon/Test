import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import {  Router } from '@angular/router';
import { UserInfo } from '@firebase/auth-types';
import { Approver } from '../../model/Approver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {email:'anusondd@gmail.com',password:'21519097'};
  message:string;
  approver:Approver;

  profile:UserInfo;
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router
  ) { }

  ngOnInit() {
  }

  login(user:User){
    
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
                .then(user=>{
                    console.log(user);
                    this.router.navigate(['/approver']);
                }).catch(e=>{
                  console.error(e);
                  this.message = e;                                    
                })
                
  }


  navigate(){

  }
  

}
