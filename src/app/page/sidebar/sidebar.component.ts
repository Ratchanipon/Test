import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }


  menus=[
    {
      name:"จัดการสมาชิก",
      url:"user"
    },
    {
      name:"จัดการหมวดหมู่โครงการ",
      url:"user"
    },
    {
      name:"จัดการโครงการ",
      url:"user"
    },
    {
      name:"จัดกาบทความ",
      url:"user"
    },
    {
      name:"วิดีโอแนะนำ",
      url:"user"
    }
  ]

  ngOnInit() {
  }

}
