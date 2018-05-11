import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, UserInfo } from 'firebase';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  profile:User;
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  )  {
    this.toastr.setRootViewContainerRef(vcr);
    this.angularFireAuth.authState.subscribe(user=>{
      this.profile = user;
      console.log(this.profile);      
    })

    

   }

  ngOnInit() {
  }

  logOut(){
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  resetPassword(){
    this.angularFireAuth.authState.subscribe(user=>{
      this.angularFireAuth.auth.sendPasswordResetEmail(user.email).then(res=>{
        this.toastr.success('Check Email '+user.email, 'Success!',{toastLife: 3000, showCloseButton: true});
      }).catch(e=>{
        this.toastr.error('Email and password are wrong.', 'Oops!',{toastLife: 1000,showCloseButton: true});
      })

    });
  }

}
