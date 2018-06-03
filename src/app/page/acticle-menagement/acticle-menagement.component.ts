import { Component, OnInit } from '@angular/core';
import { ActicleService } from '../../service/acticle.service';
import { Creatarticle } from '../../model/creatarticle';

@Component({
  selector: 'app-acticle-menagement',
  templateUrl: './acticle-menagement.component.html',
  styleUrls: ['./acticle-menagement.component.scss']
})
export class ActicleMenagementComponent implements OnInit {
  creatarticle:Creatarticle[]

  article:Creatarticle={name:'',detail:'',status:'',uid:''}

  constructor(public acticleService:ActicleService) { 
    this.getlist();
  }
  section:string="index";
  
  ngOnInit() {
  }
  getlist(){
    this.acticleService.getlist().subscribe(list=>{
      this.creatarticle=list
    })
  }
  gotodetail(article){
    this.article = article;
    this.section = "detail";
  }

  gotoIndex(){
    this.section = "index";
  }

  approve(){
    this.article.status = "approve";
    this.acticleService.update(this.article).then(res=>{
      this.section = "index";
    })


  }

  reject(){
    this.article.status = "reject";
    this.acticleService.update(this.article).then(res=>{
      this.section = "index";
    })

  }

}
