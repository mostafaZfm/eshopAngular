  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { RouterLink } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
  import { AuthService } from '../../../../core/services/auth/auth.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

  })
  export class LoginComponent {
    model = { userName: '', password: '' };

    constructor(
      private authService: AuthService,
      private toastr: ToastrService,
      private router: Router
    ) {}

    onSubmit() {
      this.authService.login(this.model).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);

            // پیام موفقیت
            this.toastr.success('ورود با موفقیت انجام شد', 'موفق');

            // redirect بعد ۲.۵ ثانیه
            setTimeout(() => this.router.navigateByUrl('/'), 2500);
          } else {
            this.toastr.error('توکن یافت نشد', 'خطا');
          }
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('خطا در ورود. لطفاً دوباره تلاش کنید', 'خطا');
        }
      });
    }
  }
