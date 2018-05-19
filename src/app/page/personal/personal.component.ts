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

    

   }

  ngOnInit() { 
    this.getAll();

    this.route.params.subscribe(params=>{
      let key = params.key;
      if(key=='reject'){
        this.toastr.success('Reject Personal!', 'Success!',{toastLife: 4000, showCloseButton: true});
      }else if(key=='approve'){
        this.toastr.success('Approve Personal!', 'Success!',{toastLife: 4000, showCloseButton: true});
      }else{
        let welcome = sessionStorage.getItem('welcome');
        if(welcome=='true'){
          this.toastr.success('Welcome to  Personal Managment!', 'Hi!',{toastLife: 6000, showCloseButton: true});
          sessionStorage.clear();
        }
        
      }
      
    });
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
