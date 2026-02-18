// core/dtos/account/registerDto.ts

export interface registerDto {
  userName: string;
  email: string;
  password: string;
}
// core/dtos/account/registerDto.ts

export interface registerResponeDto {
  token?: string;          // JWT که بعد از ثبت‌نام یا لاگین برمی‌گردد
  userId?: string;         // شناسه کاربر در سیستم (اختیاری)
  userName?: string;       // نام کاربری (اختیاری)
  email?: string;          // ایمیل کاربر (اختیاری)
}

// core/dtos/common/apiResponseDto.ts

export interface apiResponseDto<T> {
  success: boolean;   // آیا درخواست موفق بوده یا خیر
  message: string;    // پیام مربوط به درخواست (مثلاً خطا یا موفقیت)
  data?: T;           // داده برگشتی از API (مثلاً token یا لیست محصولات)
}

// core/dtos/account/loginDto.ts

export interface loginDto {
  userName: string;  // نام کاربری
  password: string;  // رمز عبور
}


