import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/products/product.service';
import { Product } from '../../../../core/models/product.model';
import { Observable } from 'rxjs';
import {AuthService} from '../../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService,
             private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
    // Observable مستقیم از سرویس
    this.products$ = this.productService.getProducts();
  }

  // addToCart(product: any): void {
  //     if(!this.authService.isLoggedIn()){
  //         this.toastr.error('کاربر گرامی لطفا ابتدا وارد سایت شوید!');
  //       this.router.navigate(['/login']);
  //       return;
  //     }
  // }

  showLoginMessage = false;

  addToCart(product: any) {

    if (!this.authService.isLoggedIn()) {
      this.showLoginMessage = true;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

      return;
    }
    }

  trackByProductId(index: number, item: Product) {
    return item.id;
  }

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/images/no-image.png';
  }

}
