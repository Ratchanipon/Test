import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }


  menus=[
    {
      name:"จัดการสมาชิก",
      url:"user"
    },
    {
      name:"จัดการหมวดหมู่โครงการ",
      url:"category"
    },
    {
      name:"จัดการโครงการ",
      url:"project"
    },
    {
      name:"จัดการบทความ",
      url:"acticle"
    },
    {
      name:"วิดีโอแนะนำ",
      url:"video"
    }
  ]

  ngOnInit() {
  }

  gotoPage(url){
    this.router.navigate(['/'+url]);
  }

}
