import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access_token);
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  getProfile(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/profiles/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateProfile(id: string, user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/profiles/${id}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/users/${id}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createBookmark(bookmark: string, id: string): Observable<any> {
    console.log('Create bookmark:', bookmark, id);
    return this.http.post(
      `${this.baseUrl}/api/profiles/${id}/bookmark`,
      { bookmark },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteBookmark(bookmark: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/profiles/${id}/bookmark`, {
      headers: this.getAuthHeaders(),
      body: { bookmark },
    });
  }

  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/api/profiles/${id}/password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/summary/users`);
  }
}
