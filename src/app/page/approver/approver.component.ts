import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ApproverService } from '../../service/approver.service';
import { Approver } from '../../model/Approver';

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
  new_sort:number;
  old_sort:number;

  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    private approverService:ApproverService,
  ) { }

  ngOnInit() {
    this.getApprovers();
    
  }

  add(user:User){
    
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(user=>{

      this.approverService.saveApprover(user.email,user.uid).then(result=>{
            //this.clear();
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
          this.approvers = list.sort((a, b) => a.sort - b.sort);
          //console.log(this.approvers);          
    });
  }

  modify(approver){
    this.router.navigate(['approver-edit',{'key':approver.$key}]);
  }

  changStatus(approver){
    this.approverService.changStatus(approver.$key,approver.statust).then(res=>{console.log(res);
    }).catch(e=>{console.log(e);
    });
  }

  sortObject(new_sort:number,key){
      console.log('new_sort',new_sort,key);
      this.new_sort = new_sort;
      this.approverService.getApprover(key).subscribe(object=>{
        this.old_sort = object.sort;
      });
      if(this.new_sort > this.old_sort){
        this.approvers.forEach(approver=>{
          if(approver.sort>this.old_sort&&approver.sort<=this.new_sort&&approver.$key!=key){
            let nextsort = (approver.sort-1)*1;
            this.approverService.sortObject(approver.$key,nextsort);
          }
        })
      }else{
        this.approvers.forEach(approver=>{
          if(approver.sort<this.old_sort&&approver.sort>=this.new_sort&&approver.$key!=key){
            let nextsort = (approver.sort+1)*1;
            this.approverService.sortObject(approver.$key,nextsort);
          }
        })
      }

      this.approverService.sortObject(key,new_sort);
      this.getApprovers();
  }

}
