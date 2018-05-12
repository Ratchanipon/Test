import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PersonalService } from '../../service/personal.service';
import { ApprovePersonal } from '../../model/ApprovePersonal';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  approvePersonal:ApprovePersonal[];

  constructor(
    private personalService:PersonalService,
    public router:Router,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    this.route.params.subscribe(params=>{
      let key = params.key;
      if(key=='reject'){
        this.toastr.success('Reject Personal!', 'Success!',{toastLife: 4000, showCloseButton: true});
      }else if('approve'){
        this.toastr.success('Approve Personal!', 'Success!',{toastLife: 4000, showCloseButton: true});
      }else{
        this.toastr.success('Welcome to  Personal Managment!', 'Hi!',{toastLife: 6000, showCloseButton: true});
      }
      
    });

   }

  ngOnInit() { 
    this.getAll();
  }

  async getAll(){
    await this.personalService.getPersonalList().subscribe(list=>{
      this.approvePersonal = list;
    });
  }

  view(approvePersonal:ApprovePersonal){
    //console.log(approvePersonal);
    this.router.navigate(['view-personal',{'key':approvePersonal.$key}]);    
  }

}
