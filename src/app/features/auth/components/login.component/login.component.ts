  import {Component, OnInit} from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import {ActivatedRoute, RouterLink} from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
  import { AuthService } from '../../../../core/services/auth/auth.service';
  import { Router } from '@angular/router';
  import {AlertifyService} from '../../../../core/models/alert/alertify.service';
  import * as alertify from 'alertifyjs';
  import {withInterceptors} from '@angular/common/http';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

  })
  export class LoginComponent implements OnInit {
    model = { userName: '', password: '' };

    constructor(
      private authService: AuthService,
      private toastr: ToastrService,
      private router: Router,
      private route: ActivatedRoute,
      private alertify: AlertifyService,

    ) {}

    ngOnInit(): void {
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";
      }
    returnUrl: string = '/';

    onSubmit() {
      this.authService.login(this.model).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess && res.token && res.refreshToken) {
            // همه Token ها و تاریخ انقضا را AuthService مدیریت میکند
            this.authService.setTokens(res.token, res.refreshToken);

            // پیام موفقیت
            this.toastr.success(res.message);

            // redirect بعد ۲.۵ ثانیه
            setTimeout(() => {
              this.router.navigateByUrl(this.returnUrl);
            }, 2500);
          } else {
            // پیام خطا از سرور
            this.toastr.error(res.message);
          }
        },
        error: (err) => {
          this.toastr.error('خطا در ورود. لطفاً دوباره تلاش کنید');
        },
      });
    }
  }
