import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';

@Component({
  selector: 'app-edit-approver',
  templateUrl: './edit-approver.component.html',
  styleUrls: ['./edit-approver.component.css']
})
export class EditApproverComponent implements OnInit {


  approver:Approver
  constructor(
    public router:Router,
    private route: ActivatedRoute,
    private approverService:ApproverService,
  ) {
    this.route.params.subscribe(params=>{
      
      const key = params.key;
      this.approverService.getApprover(key).subscribe(aprover=>{
        this.approver = aprover;
        console.log(this.approver);
      })
    })
   }

  ngOnInit() {
  }

  update(approver){
    console.log(approver);
    this.approverService.updateApprover(approver.$key,approver).then(res=>{
      this.router.navigate(['approver']);
    }).catch(e=>{
      console.log(e);      
    })
    
  }

}
