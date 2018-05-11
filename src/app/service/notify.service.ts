import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NotifyService {

  apiUrl: string = 'https://fcm.googleapis.com/fcm/send';
  constructor(
    private http: HttpClient,
  ) { }


  sendNotificetionTo(uid: string, topic: string, detail: string) {
    let data = {
      "notification": {
        "title": topic,
        "body": detail,
        //"click_action" : "https://dummypage.com"
      },
      "to": "/topics/" + uid
    };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', ['key=AIzaSyAl7wlMin0mpzY3K8ZOW3kSPf4sxGEYHvE']).set('Content-Type', ['application/json']),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });

  }

  

  

}
