import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {registerDto, registerResponeDto, apiResponseDto, loginDto} from '../../models/auth/registerDto';
import { Observable, catchError, of } from 'rxjs';
import { ApiAddressUtilities } from '../../../shared/utilities/apiAddressUtilities';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // لاگین کاربر
  login(model: loginDto): Observable<apiResponseDto<registerResponeDto>> {
    return this.http.post<apiResponseDto<registerResponeDto>>(
      ApiAddressUtilities.login,
      model
    );
  }

  // ثبت‌نام کاربر
  register(model: registerDto): Observable<apiResponseDto<registerResponeDto>> {
    return this.http.post<apiResponseDto<registerResponeDto>>(
      ApiAddressUtilities.register,
      model
    );
  }

  // بررسی وضعیت ورود کاربر
  // checkLogin(): Observable<{ isLoggedIn: boolean }> {
  //   return this.http
  //     .get<{ isLoggedIn: boolean }>(ApiAddressUtilities.checkLogin, {
  //       withCredentials: true,
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         console.log('checkLogin error status:', error.status);
  //         // اگر 401 یا هر خطایی → fallback به لاگین نشده
  //         return of({ isLoggedIn: false });
  //       })
  //     );
  // }

  // ذخیره توکن JWT
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // دریافت توکن JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // حذف توکن (Logout)
  logout() {
    localStorage.removeItem('token');
  }
}
