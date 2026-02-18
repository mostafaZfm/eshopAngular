import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductListComponent} from '../components/product-list.component/product-list.component';
import {RouterModule} from '@angular/router';
import {routes} from '../../../app.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductListComponent,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModuleModule { }
