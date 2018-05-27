import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-user-menagement',
  templateUrl: './user-menagement.component.html',
  styleUrls: ['./user-menagement.component.scss']
})
export class UserMenagementComponent implements OnInit {

  userList:User[];
  constructor(
    private userService:UserService
  ) {
    this.userService.getUserList().subscribe(list=>{
        this.userList = list;
        console.log(this.userList);
        
    })
   }

  ngOnInit() {
  }

}
