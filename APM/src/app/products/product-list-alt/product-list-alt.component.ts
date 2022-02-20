import { Component } from '@angular/core';

import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId: number;

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  products$ = this.productService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
