import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ApproverService } from './service/approver.service';
import { Approver } from './model/Approver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My First Angular App';
  uid: string;
  approver: Approver;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public router: Router,
    private approverService: ApproverService
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user != null) {
        this.approverService.getApprover(user.uid).subscribe(user => {
          if (user.jobPosition == "admin") {
            this.router.navigate(['/approver']);
            this.uid = user.jobPosition;
          }else if(user.jobPosition=="approver"&&user.statust==true){
            this.router.navigate(['/personal']);
            this.uid = user.jobPosition;
          }
        });
      } else {
        this.uid = null;
        this.router.navigate(['/']);
      }
    })
  }
}
