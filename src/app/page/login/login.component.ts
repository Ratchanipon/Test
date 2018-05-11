import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import {  Router } from '@angular/router';
import { UserInfo } from '@firebase/auth-types';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';
import { ToastsManager } from 'ng2-toastr';

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
    private approverService:ApproverService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  login(user:User){
    
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
                .then(user=>{
                    console.log(user);
                    if(user!=null){
                      this.approverService.getApprover(user.uid).subscribe(user=>{
                        this.toastr.success('Welcome '+user.email, 'Success!',{toastLife: 3000, showCloseButton: true});
                        
                        if(user.jobPosition=="admin"){                          
                          //this.router.navigate(['/approver']);
                          setTimeout(() =>{
                            this.router.navigate(['/approver']);
                          },5000);
                        }else if(user.jobPosition=="approver"&&user.statust==true){
                          //this.router.navigate(['/personal']);
                          setTimeout(() =>{
                            this.router.navigate(['/personal']);
                          },5000);
                        }

                      });
                    }else{
                      //this.router.navigate(['/']);
                      this.toastr.error('Email and password are wrong.', 'Oops!',{toastLife: 10000,showCloseButton: true});
                    }
                }).catch(e=>{
                  console.error(e);
                  this.message = e;
                  this.toastr.error(this.message, 'Oops!',{toastLife: 10000,showCloseButton: true});                                    
                })
                
  }

  


 
  

}
