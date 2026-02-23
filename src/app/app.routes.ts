import { Routes } from '@angular/router';
import {ProductListComponent} from './features/products/components/product-list.component/product-list.component';
import {
  RegisterAccountComponent
} from './features/auth/components/register-account.component/register-account.component';
import {LoginComponent} from './features/auth/components/login.component/login.component';
import {DashboardComponent} from './admin/components/dashboard.component/dashboard.component';
import {ProductsComponent} from './admin/components/products.component/products.component';
import {UsersComponent} from './admin/components/users.component/users.component';
import {AdminLayoutComponent} from './admin/components/admin-layout.component/admin-layout.component';
import {CheckoutComponent} from './features/orders/components/checkout.component/checkout.component';
import {authGuard} from './admin/guards/auth.guard-guard';
import {guestGuard} from './admin/guards/guest.guard';

export const routes: Routes = [
  { path:"" , component: ProductListComponent },
  { path:"Register" , component: RegisterAccountComponent,canActivate: [guestGuard]  },
  { path:"login" , component: LoginComponent,canActivate: [guestGuard] },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {path: "", redirectTo: "dashboard", pathMatch: "full"}, // /admin → /admin/dashboard
      {path: "dashboard", component: DashboardComponent},
      {path: "products", component: ProductsComponent},
      {path: "users", component: UsersComponent}
    ]
  },
  { path: 'checkout',    component: CheckoutComponent,    canActivate: [authGuard]  },

  // مسیر fallback
  { path: "**", redirectTo: "" }

];
