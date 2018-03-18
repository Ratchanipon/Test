import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../service/personal.service';
import { ApprovePersonal } from '../../model/ApprovePersonal';
import { Router } from '@angular/router';

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
  ) { }

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
