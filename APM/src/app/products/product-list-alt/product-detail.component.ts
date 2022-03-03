import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { Supplier } from 'src/app/suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  product: Product | null = null;

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  pageTitle$ = this.productService.selectedProduct$
      .pipe(
        map(p => p ? `Product Detail For: ${p.productName}` : null )
      )

  productSuppliers$ = this.productService.selectedProductSuppliers$ 
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  vm$ = combineLatest([
    this.product$,
    this.productSuppliers$,
    this.pageTitle$
  ])
    .pipe(
      filter(([product]) => Boolean(product)),
      map(([product, productSuppliers, pageTitle]) => 
        ({product, productSuppliers, pageTitle}))
    )

  constructor(private productService: ProductService) { }

}
