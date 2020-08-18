import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { NotificationService } from "./notification.service";
import { BaseModel } from "../models/baseModel";

export interface UserResult {
  user: User;
  message: string;
  successed: boolean;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public loggedIn = false;
  private currentUser: User;
  get user(): User {
    this.currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
    if (this.currentUser) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    return this.currentUser;
  }
  public message: string = "";

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  logIn(userName: string, password: string) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let body = { userName: userName, password: password };
    let httpOptions = {
      headers: headers,
      withCredentials: true,
    };
    return this.http.post<UserResult>(`${environment.apiUrl}User/Login`, body, httpOptions);    
  }

  singUp(user: User) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let httpOptions = {
      headers: headers,
    };
    return this.http.post(`${environment.apiUrl}User/Registration`, user, httpOptions)
  }

  refresh() {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    let httpOptions = {
      headers: headers,
      withCredentials: true,
    };

    this.http
      .post(`${environment.apiUrl}User/RefreshToken`, {}, httpOptions)
      .subscribe(
        (res) => {
          this.loggedIn = true;
          console.log("tokens are updeted");
        },
        (err) => {
          this.logOut();
          console.log("not refreshed");
        }
      );
  }

  logOut() {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.loggedIn = false;
  }
}
