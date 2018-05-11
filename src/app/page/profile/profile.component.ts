import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ApproverService } from '../../service/approver.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile:UserInfo;
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    private approverService:ApproverService
  ) { }

  ngOnInit() {
  }

}
