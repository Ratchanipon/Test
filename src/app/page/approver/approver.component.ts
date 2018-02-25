import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ApproverService } from '../../service/approver.service';
import { Approver } from '../../model/Approver';
import { NotificationsService } from 'angular4-notify';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  user:User = {email:'anusondd@gmail.com',password:'21519097'};
  key:string='';
  massage:string='';
  approver:Approver;
  approvers:Approver[];


  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    private approverService:ApproverService,
    protected notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.getApprovers();
  }

  add(user:User){
    
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(user=>{

      this.approverService.saveApprover(user.email,user.uid).then(result=>{
        this.notificationsService.addInfo('Information message');
            this.clear();
      }).catch(error=>{
        this.massage = error;
        console.log(this.massage);
      })      
      
    }).catch(error=>{
      this.massage = error;
      console.log(this.massage);
    })
    //this.router.navigate(['/user']);
  }


  clear(){
    this.user = {email:'',password:''};
  }

  async getApprovers(){
    await this.approverService.getApproverList().subscribe(list=>{
          this.approvers = list;
    });
  }

  modify(approver){
    this.router.navigate(['approver-edit',{'key':approver.$key}]);
  }

}
