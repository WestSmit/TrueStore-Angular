import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';

export interface UserResult {
  user: User;
  message: string;
  successed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedIn = false;
  private currentUser: User;
  get user(): User {
    return this.currentUser;
  }
  public errors: string = '';

  constructor(private http: HttpClient, private cookieService: CookieService, private notificationService: NotificationService) {
    this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    if (this.currentUser != undefined && this.currentUser != null) {
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  }

  async logIn(userName: string, password: string): Promise<boolean> {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body = { userName: userName, password: password };
    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    var model = await this.http.post<UserResult>(`${environment.apiUrl}User/Login`, body, httpOptions).toPromise();
    if (model.successed == false) {
      this.errors = model.message;
      this.loggedIn = false;
      return false;
    }
    else {
      this.currentUser = model.user;
      this.errors = model.message;
      this.loggedIn = true;
      localStorage.setItem("CurrentUser", JSON.stringify(this.currentUser));
      this.notificationService.addNotice("Welcome!!! You can go to", "/MyAccount/Details", "account details")
      if (this.currentUser.emailConfirmed == false) {
        this.notificationService.addNotice("Your email is mot confirmed. We have sended you letter with link to confirm. Check your inbox...")
      }
      return true;
    }
  }

  async SingUp(user: User): Promise<boolean> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpOptions = {
      headers: headers
    };
    var error = await this.http.post<string>(`${environment.apiUrl}User/Registration`, user, httpOptions).toPromise();
    if (error != null) {
      this.errors = error;
      this.loggedIn = false;
      return false;
    }
    else {
      return true;
    }
  }

  refresh() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    this.http.post(`${environment.apiUrl}User/RefreshToken`, {}, httpOptions)
      .subscribe(res => {
        this.loggedIn = true;
        console.log("tokens are updeted")
      }, err => {
        this.logOut();
        console.log("not refreshed")
      });
  }

  logOut() {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.loggedIn = false;
  }

}
