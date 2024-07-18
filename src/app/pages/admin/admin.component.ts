import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  selectedSection = 'summary';
  isCollapsed = false;

  selectSection(section: string) {
    this.selectedSection = section;
  }
}
