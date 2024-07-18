import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnfiteredProductsService {
  private CrudUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getAllUnfilteredProducts(): Observable<any[]> {
    const data = this.http.get<any[]>(
      this.CrudUrl + '/api/unfiltered-products'
    );
    console.log('Received data', data);
    return this.http.get<any[]>(this.CrudUrl + '/api/unfiltered-products');
  }

  getUnfilteredProductById(productId: string): Observable<any> {
    return this.http.get<any>(
      `${this.CrudUrl + '/api/unfiltered-products'}/${productId}`
    );
  }

  deleteAllUnfilteredProducts(): Observable<any> {
    return this.http.delete<any>(this.CrudUrl + '/api/unfiltered-products');
  }

  deleteUnfilteredProductById(productId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.CrudUrl + '/api/unfiltered-products'}/${productId}`
    );
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(
      this.CrudUrl + '/api/summary/unfiltered-products'
    );
  }
}
