import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private CrudUrl = 'http://localhost:3001';
  private ScrapeUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.CrudUrl + '/api/products');
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.CrudUrl + '/api/products'}/${productId}`);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.CrudUrl + '/api/category/'}${category}`
    );
  }

  updateProduct(productId: string, product: any): Observable<any> {
    return this.http.patch<any>(
      `${this.CrudUrl + '/api/products'}/${productId}`,
      product
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.CrudUrl + '/api/products'}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.CrudUrl + '/api/products'}/${productId}`
    );
  }

  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.CrudUrl}/search/${query}`).pipe(
      catchError((error) => {
        console.error('Error in first search:', error);
        return of([]);
      }),
      switchMap((resultFromFirstSearch) => {
        if (resultFromFirstSearch.length > 0) {
          return of(resultFromFirstSearch);
        } else {
          return this.http.get<any[]>(`${this.ScrapeUrl}/search/${query}`).pipe(
            catchError((error) => {
              console.error('Error in second search:', error);
              return of([]);
            })
          );
        }
      })
    );
  }

  filterAndStoreProduct(data: any): Observable<any> {
    return this.http.post<any>(
      this.ScrapeUrl + '/api/products/filterAndStoreProduct',
      data
    );
  }

  filterAndStoreMultipleProducts(dataArray: any[]): Observable<any> {
    return this.http.post<any>(
      this.ScrapeUrl + '/api/products/filterAndStoreMultipleProducts',
      dataArray
    );
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(this.CrudUrl + '/api/summary/products');
  }
}
