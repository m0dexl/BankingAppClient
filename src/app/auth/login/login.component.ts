import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginRequest } from 'src/core/models/request/login-request-model';
import { ResponseStatus } from 'src/core/models/response/base-response-model';
import { AuthService } from 'src/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  public loginRequest: LoginRequest = <LoginRequest>{};

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  async login() {
    let status = await this.authService.login(this.loginRequest);

    if (status == ResponseStatus.Ok) {
      this.messageService.add({
        severity: 'success',
        summary: 'Başarılı',
        detail: 'Giriş yapılıyor. Hoşgeldiniz!',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Hata',
        detail: 'Kullanıcı adı veya şifre hatalı!',
      });
    }
  }
}
