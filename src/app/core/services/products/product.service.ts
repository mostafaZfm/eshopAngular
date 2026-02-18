// src/app/core/services/products/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { ApiAddressUtilities } from '../../../shared/utilities/apiAddressUtilities';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(ApiAddressUtilities.products);
  }

  createProduct(model: Product): Observable<Product> {
    return this.http.post<Product>(ApiAddressUtilities.products, model);
  }
}
