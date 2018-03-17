import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import {  Router } from '@angular/router';
import { UserInfo } from '@firebase/auth-types';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {email:'anusondd@hotmail.com',password:'21519097'};
  message:string;
  approver:Approver;

  profile:UserInfo;
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    private approverService:ApproverService
  ) { }

  ngOnInit() {
  }

  login(user:User){
    
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
                .then(user=>{
                    console.log(user);
                    if(user!=null){
                      this.approverService.getApprover(user.uid).subscribe(user=>{
                        if(user.jobPosition=="admin"){
                          this.router.navigate(['/approver']);
                        }else if(user.jobPosition=="approver"&&user.statust==true){
                          this.router.navigate(['/personal']);
                        }
                      });
                    }else{
                      this.router.navigate(['/']);
                    }
                }).catch(e=>{
                  console.error(e);
                  this.message = e;                                    
                })
                
  }


  navigate(){

  }
  

}
