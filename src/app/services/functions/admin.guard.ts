import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAdmin = this.authService.checkAdmin();
    if (!isAdmin) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
