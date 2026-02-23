import { Component, signal, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './features/products/components/product-list.component/product-list.component';
import { filter } from 'rxjs';
import {CommonModule, NgIf} from '@angular/common';
import {AuthService} from './core/services/auth/auth.service';  // ⚠ اضافه شد

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, RouterLink, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  protected readonly title = signal('eshop');

  // signal reactive
  showNavbar = signal(true);

  constructor(private router: Router,
            private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkToken()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // تغییر signal
      this.showNavbar.set(!event.urlAfterRedirects.startsWith('/admin'));
      console.log('showNavbar', this.showNavbar());
    });
  }
}
