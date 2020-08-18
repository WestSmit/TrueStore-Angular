import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { tap } from "rxjs/operators";
import { LoginService } from "./services/login.service";

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private loginService: LoginService  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieService.get("AccessToken")}`,
        RefreshToken: `${this.cookieService.get("RefreshToken")}`,
        UserId: `${this.cookieService.get("UserId")}`,
      },
    });

    return next.handle(req).pipe(
      tap(
        () => {},
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              let failedReq = req.clone();
              this.loginService.refresh();
              return next.handle(failedReq);
            }
          }
        }
      )
    );
  }
}
