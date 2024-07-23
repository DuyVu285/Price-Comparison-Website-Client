import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private CrudUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getAllModels(): Observable<any[]> {
    return this.http.get<any[]>(this.CrudUrl + '/api/models');
  }

  getModelById(modelId: string): Observable<any> {
    return this.http.get<any>(`${this.CrudUrl + '/api/models'}/${modelId}`);
  }

  updateModel(modelId: string, model: any): Observable<any> {
    return this.http.patch<any>(
      `${this.CrudUrl + '/api/models'}/${modelId}`,
      model
    );
  }

  createModel(model: any): Observable<any> {
    return this.http.post<any>(`${this.CrudUrl + '/api/models'}`, model);
  }

  deleteModel(modelId: string): Observable<any> {
    return this.http.delete<any>(`${this.CrudUrl + '/api/models'}/${modelId}`);
  }

  checkModels(productNames: string[]): Observable<{ [key: string]: boolean }> {
    return this.http.post<{ [key: string]: boolean }>(
      `${this.CrudUrl}/api/models/check`,
      { productNames }
    );
  }

  getSummary(): Observable<any> {
    return this.http.get<any>(this.CrudUrl + '/api/summary/models');
  }
}
