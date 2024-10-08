import { Component } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css'],
})
export class CategoryMenuComponent {
  isCategoryOpen = false;

  toggleCategoryMenu(open: boolean): void {
    this.isCategoryOpen = open;
  }
}
