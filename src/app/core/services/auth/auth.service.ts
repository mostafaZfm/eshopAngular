import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  registerDto,  registerResponeDto,  apiResponseDto,  loginDto,  loginResponseDto} from '../../models/auth/registerDto';
import { jwtDecode } from 'jwt-decode';
import {Observable, catchError, of, tap} from 'rxjs';
import { ApiAddressUtilities } from '../../../shared/utilities/apiAddressUtilities';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private tokenExpKey = 'token_exp';
  private refreshKey = 'refresh_token';

  constructor(private http: HttpClient,
              private router: Router,) {}

  // لاگین کاربر
  // login(model: loginDto): Observable<loginResponseDto> {
  //   return this.http.post<loginResponseDto>(
  //     ApiAddressUtilities.login,
  //     model
  //   );
  // }

  login(model: loginDto): Observable<loginResponseDto> {
    return this.http.post<loginResponseDto>(ApiAddressUtilities.login, model)
      .pipe(
        tap(res => {
          if(res.isSuccess && res.token && res.refreshToken){
            this.setTokens(res.token, res.refreshToken);
          }
        })
      );
  }
  register(model: registerDto): Observable<apiResponseDto<registerResponeDto>> {
    return this.http.post<apiResponseDto<registerResponeDto>>(
      ApiAddressUtilities.register,
      model
    );
  }
  setTokens(token: string, refreshToken: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshKey, refreshToken);

    const payload: any = JSON.parse(atob(token.split('.')[1]));
    const expiresAt = payload.exp * 1000;
    localStorage.setItem(this.tokenExpKey, expiresAt.toString());

    this.startAutoLogout(expiresAt);
  }

  getToken(): string | null { return localStorage.getItem(this.tokenKey); }
  getRefreshToken(): string | null { return localStorage.getItem(this.refreshKey); }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const exp = localStorage.getItem(this.tokenExpKey);
    return !!token && !!exp && Date.now() < +exp;
  }

  startAutoLogout(expirationTime: number) {
    const timeout = expirationTime - Date.now();
    if(timeout > 0){
      setTimeout(() => this.refreshToken(), timeout - 30000); // 30 ثانیه قبل refresh
    } else {
      this.refreshToken();
    }
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    if(!refreshToken) { this.logout(); return; }

    this.http.post<{ accessToken: string }>(ApiAddressUtilities.refresh, { refreshToken })
      .pipe(
        catchError(() => { this.logout(); return of(null); })
      )
      .subscribe(res => {
        if(res && res.accessToken){
          this.setTokens(res.accessToken, refreshToken!); // refreshToken قدیمی را نگه میداریم
        } else {
          this.logout();
        }
      });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpKey);
    localStorage.removeItem(this.refreshKey);
    this.router.navigate(['/login']);
  }

  checkToken() {
    const token = this.getToken();
    const exp = localStorage.getItem(this.tokenExpKey);

    // 1️⃣ اگر Token وجود ندارد → logout
    if (!token || !exp) {
      this.logout();
      return;
    }

    // 2️⃣ اگر Token منقضی شده → refresh
    if (Date.now() >= +exp) {
      this.refreshToken();
    }
  }

}
