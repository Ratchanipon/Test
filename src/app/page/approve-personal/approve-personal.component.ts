import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonalService } from '../../service/personal.service';
import { ApprovePersonal } from '../../model/ApprovePersonal';
import * as firebase from 'firebase';
import { NotifyService } from '../../service/notify.service';


@Component({
  selector: 'app-approve-personal',
  templateUrl: './approve-personal.component.html',
  styleUrls: ['./approve-personal.component.css']
})
export class ApprovePersonalComponent implements OnInit {

  approvePersonal:ApprovePersonal;

  constructor(
    private personalService:PersonalService,
    public router:Router,
    private route: ActivatedRoute,
    private notifyService:NotifyService
  ) {
    this.route.params.subscribe(params=>{
      
      const key = params.key;
      this.personalService.getPersonal(key).subscribe(aprover=>{
        this.approvePersonal = aprover;
        //this.imagePreview = aprover.pictureProfile;
        console.log("ApprovePersonal",this.approvePersonal);
      })
    })
   }

  ngOnInit() {
  }

  approve(approvePersonal:ApprovePersonal){
   this.approvePersonal.approver =  localStorage.getItem('uid');
   this.approvePersonal.statusApprove = true;
    console.log(approvePersonal);
    this.personalService.updatePersonal(approvePersonal.$key,approvePersonal).then(res=>{      
      this.notifyService.sendNotificetionTo(approvePersonal.Personal.token,'Accept','The reviewer has already approved your information.');
      this.router.navigate(['personal']);
    })
  }

  reject(approvePersonal:ApprovePersonal){
    this.approvePersonal.approver =  localStorage.getItem('uid');
    this.approvePersonal.statusApprove = false;
    console.log(approvePersonal);
    this.personalService.updatePersonal(approvePersonal.$key,approvePersonal).then(res=>{
      this.notifyService.sendNotificetionTo(approvePersonal.Personal.token,'Reject','The reviewer has already Reject your information.');
      this.router.navigate(['personal']);
    })
  }

  back(){
    this.router.navigate(['personal']);
  }

}
