import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-menagement',
  templateUrl: './user-menagement.component.html',
  styleUrls: ['./user-menagement.component.scss']
})
export class UserMenagementComponent implements OnInit {

  userList:User[];
  constructor(
    private userService:UserService,
    private angularFireAuth:AngularFireAuth,
  ) {
    this.userService.getUserList().subscribe(list=>{
        this.userList = list;
        console.log(this.userList);
        
    })
    
   }

  ngOnInit() {
  }

  permission(user:User){
    if(user.permission==true){
      user.permission = false;
      this.userService.permissionUser(user.$key,user);
    }else{
      user.permission = true;
      this.userService.permissionUser(user.$key,user);
    }
      
  }

}
