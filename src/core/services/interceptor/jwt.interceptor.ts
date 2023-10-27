import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.startsWith(environment.api_url) &&
      !request.url.includes('RefreshToken')
    ) {
      const expiration = Date.parse(
        JSON.parse(<string>sessionStorage.getItem('token_expiration'))
      );

      if (expiration != null && Date.now() > expiration) {
        this.authService.refreshToken().then((result) => {
          if (result) {
            request = this.setRequest(request);
          } else {
            this.authService.logOut();
          }
        });
      }

      request = this.setRequest(request);
    }

    return next.handle(request);
  }
  private setRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(
          <string>sessionStorage.getItem('access_token')
        )}`,
      },
    });
  }
}
