import { Injectable } from '@angular/core';
import {Notice} from '../models/notice'

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications:Notice[] =[];

  get notifications(): Notice[]{
    return this._notifications;
  }  

  constructor() { 
    this._notifications = JSON.parse(localStorage.getItem('Notices'));

    if (this._notifications == undefined || this._notifications == null) 
    {
      this._notifications = [];
    }
    
  }

  addNotice(message:string, link?:string, linkName?:string){
    this._notifications.push(new Notice(message, link, linkName));    
    localStorage.setItem("Notices", JSON.stringify(this._notifications));
  }
  deleteNotice(index:number){
    this._notifications.splice(index,1);    
    localStorage.setItem("Notices", JSON.stringify(this._notifications));    
  }
}
