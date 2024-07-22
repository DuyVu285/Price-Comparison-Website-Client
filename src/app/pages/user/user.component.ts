import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  isCollapsed = false;
  selectedSection: string = 'profile';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedSection = params.get('section') || 'profile';
    });
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }
}
