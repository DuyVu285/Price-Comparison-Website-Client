import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<any>(`${this.CrudUrl + '/api/models/create'}`, model);
  }

  deleteModel(modelId: string): Observable<any> {
    return this.http.delete<any>(`${this.CrudUrl + '/api/models'}/${modelId}`);
  }
}
