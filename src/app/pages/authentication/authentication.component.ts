import { Component } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  isDisplayedLogin = true;

  toggleDisplay() {
    this.isDisplayedLogin = !this.isDisplayedLogin;
  }
}
