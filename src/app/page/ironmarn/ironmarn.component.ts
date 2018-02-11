import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';
import { Hero } from '../../model/hero';

@Component({
  selector: 'app-ironmarn',
  templateUrl: './ironmarn.component.html',
  styleUrls: ['./ironmarn.component.css']
})
export class IronmarnComponent implements OnInit {
  heros:Hero[];
  Zcash;
  constructor(
    private apiService:ApiServiceService
  ) {
    this.heros = this.apiService.getHeroes();
    let api = this.apiService.getApi();
    api.subscribe(res=>{
      console.log(res);
      this.Zcash = res;
    })
    
    
   }

  ngOnInit() {
   
   console.log(this.heros);
  }

}
