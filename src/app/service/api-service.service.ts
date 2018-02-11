import { Injectable } from '@angular/core';
import { HEROES } from '../model/mock-heroes';
import { Hero } from '../model/hero';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiServiceService {
  results:[{}];
  constructor(
    private http: HttpClient,
  ) { }


  getHeroes(): Hero[] {
    return HEROES;
  }

  getApi(){    
    return this.http.get('https://api.coinmarketcap.com/v1/ticker/zcash/');
    
  }

}
