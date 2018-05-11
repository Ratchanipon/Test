import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ApproverService } from '../../service/approver.service';
import { Approver } from '../../model/Approver';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  user:User = {email:'',password:''};
  key:string='';
  massage:string='';
  approver:Approver;
  approvers:Approver[];
  new_sort:number;
  old_sort:number;
  nextsort:number;

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
    this.getApprovers();
    
  }

  add(user:User){
    if(user.email!=''&&user.password!=''){
      this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(user=>{

        this.approverService.saveApprover(user.email,user.uid).then(result=>{
              //this.clear();
        }).catch(error=>{
          this.massage = error;
          console.log(this.massage);
          this.toastr.success('You are awesome!', 'Success!',{toastLife: 3000, showCloseButton: true});
        })      
        
      }).catch(error=>{
        this.massage = error;
        console.log(this.massage);      
        this.toastr.error(error.message, 'Oops!',{toastLife: 10000,showCloseButton: true});
        // error.message
      })
      //this.router.navigate(['/user']);
    }else{
      this.toastr.error('Please fill in the information', 'Oops!',{toastLife: 10000,showCloseButton: true});
    }
    
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
            this.nextsort = approver.sort--;
            this.approverService.sortObject(approver.$key,this.nextsort);
          }
        })
      }else{
        this.approvers.forEach(approver=>{
          if(approver.sort<this.old_sort&&approver.sort>=this.new_sort&&approver.$key!=key){
            this.nextsort = approver.sort++;
            this.approverService.sortObject(approver.$key,this.nextsort);
          }
        })
      }

      this.approverService.sortObject(key,new_sort);
      this.getApprovers();
  }

}
