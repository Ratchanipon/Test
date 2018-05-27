import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import {  Router } from '@angular/router';
// import { UserInfo } from '@firebase/auth-types';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';
import { ToastsManager } from 'ng2-toastr';
import { Admin } from '../../model/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:Admin = {email:'',password:''};
  message:string;
  approver:Approver;
  loading:boolean = true;

  // profile:UserInfo;
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

  login(user:Admin){
    
      this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
                .then(user=>{
                    console.log(user);
                    if(user!=null){

                      this.toastr.success('Welcome '+user.email, 'Success!',{toastLife: 3000, showCloseButton: true});
                      sessionStorage.setItem('welcome','true');                      
                      this.router.navigate(['/user']);
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
