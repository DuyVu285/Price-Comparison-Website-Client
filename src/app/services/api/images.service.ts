import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private crudUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getImageById(imageId: string): Observable<Blob> {
    return this.http.get(`${this.crudUrl}/api/images/${imageId}`, {
      responseType: 'blob',
    });
  }
}
