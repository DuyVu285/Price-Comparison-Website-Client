import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/functions/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateAuthStatus();
    this.authService.loginStatus.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      this.username = localStorage.getItem('username');
    });
    this.authService.adminStatus.subscribe((status: boolean) => {
      this.isAdmin = status;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateAuthStatus();
      });
  }

  private updateAuthStatus() {
    this.username = localStorage.getItem('username');
    this.isLoggedIn = !!this.username;
    this.isAdmin = localStorage.getItem('role') === 'true';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
