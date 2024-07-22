import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());

  loginStatus = this.loggedIn.asObservable();
  adminStatus = this.isAdmin.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  checkAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'true'; // 'true' is a string in localStorage
  }

  login() {
    this.loggedIn.next(true);
    this.isAdmin.next(this.checkAdmin());
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
    this.isAdmin.next(false);
  }
}
