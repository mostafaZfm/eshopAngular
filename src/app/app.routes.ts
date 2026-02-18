import { Routes } from '@angular/router';
import {ProductListComponent} from './features/products/components/product-list.component/product-list.component';
import {
  RegisterAccountComponent
} from './features/auth/components/register-account.component/register-account.component';

export const routes: Routes = [
  { path:"" , component: ProductListComponent },
  { path:"Register" , component: RegisterAccountComponent },
];
