import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {provideToastr, ToastrService} from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { registerDto } from '../../../../core/models/auth/registerDto';

@Component({
  selector: 'app-register-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent {
  loading: boolean = false;  // این اضافه شد

  registerForm = null as any; // فقط برای تعریف اولیه

  constructor(

  private fb: FormBuilder,
    private authService: AuthService ,
    private toastr: ToastrService,
    private router: Router
  ) {
    // مقداردهی فرم **در constructor**
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error('لطفاً تمام فیلدها را به درستی پر کنید', 'خطا');
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.toastr.error('پسورد و تکرار آن یکسان نیست', 'خطا');
      return;
    }

    const model: registerDto = {
      userName: this.registerForm.value.userName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };
    this.loading = true;  // شروع لودینگ

    this.authService.register(model).subscribe({
      next: (res) => {
        this.loading = false; // پایان لودینگ

        if (res.success) {
          this.toastr.success(res.message, 'ثبت‌نام موفق');
          setTimeout(() => this.router.navigateByUrl('/login'), 2000);
        } else {
          this.toastr.error(res.message, 'خطا');
        }
      },
      error: (err) => {
        this.loading = false; // پایان لودینگ
        console.error(err);
        this.toastr.error('خطا در ثبت‌نام. لطفاً دوباره تلاش کنید', 'خطا');
      }
    });
  }
}
