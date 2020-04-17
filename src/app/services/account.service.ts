import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { LoginService, UserResult } from './login.service';
import { environment } from 'src/environments/environment';

interface Result {
  succeeded: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public message = "";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  async updateUserInfo(newuser: User): Promise<boolean> {
    let currentUser = this.loginService.user;
    currentUser.firstName = newuser.firstName;
    currentUser.secondName = newuser.secondName;
    currentUser.userName = newuser.userName;
    currentUser.phoneNumber = newuser.phoneNumber;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let httpOptions = {
      headers: headers
    };
    var model = await this.http.post<UserResult>(`${environment.apiUrl}Account/UpdateUserInfo`, currentUser, httpOptions).toPromise();
    this.message = model.message;
    if (model.successed == false) {
      return false;
    }
    else {
      localStorage.setItem("CurrentUser", JSON.stringify(model.user));
      return true;
    }
  }

  async changeEmail(userId: string, newEmail: string): Promise<boolean> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let httpOptions = {
      headers: headers
    };
    var model = await this.http.post<UserResult>(`${environment.apiUrl}Account/ChangeUserEmail`,
      { userId: userId, newEmail: newEmail }, httpOptions).toPromise();
    this.message = model.message;
    if (model.successed == false) {
      return false;
    }
    else {
      return true;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    let httpOptions = {
      headers: headers
    };
    var result = await this.http.post<Result>(`${environment.apiUrl}Account/ChangeUserPassword`,
      { userId: userId, currentPassword: currentPassword, newPassword: newPassword }, httpOptions).toPromise();
    this.message = result.message;
    if (result.succeeded == false) {
      return false;
    }
    else {
      return true;
    }
  }
}
