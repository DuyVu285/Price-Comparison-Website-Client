import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModelsService } from 'src/app/services/api/models.service';
@Component({
  selector: 'app-models-dashboard',
  templateUrl: './models-dashboard.component.html',
  styleUrls: ['./models-dashboard.component.css'],
})
export class ModelsDashboardComponent {
  editCache: {
    [key: string]: {
      edit: boolean;
      data: any;
    };
  } = {};
  models: any[] = [];
  displayedModels: any[] = [];
  pageIndex: number = 1;
  pageSize: number = 10;
  searchValue = '';
  visible = false;

  constructor(private readonly modelsService: ModelsService) {}

  ngOnInit() {
    this.getModels();
  }

  getModels() {
    this.modelsService.getAllModels().subscribe({
      next: (data: any) => {
        this.models = data;
        this.updateEditCache();
        this.updateDisplayedModels();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  onModelAdded() {
    this.getModels();
  }

  updateEditCache(): void {
    this.models.forEach((item) => {
      this.editCache[item._id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  updateDisplayedModels(): void {
    this.displayedModels = this.models.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize
    );
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  saveEdit(id: string): void {
    const index = this.models.findIndex((item) => item._id === id);
    if (
      JSON.stringify(this.models[index]) !==
      JSON.stringify(this.editCache[id].data)
    ) {
      Object.assign(this.models[index], this.editCache[id].data);
      this.modelsService.updateModel(id, this.models[index]).subscribe({
        next: () => {
          this.editCache[id].edit = false;
          this.updateDisplayedModels();
        },
      });
    } else {
      this.editCache[id].edit = false;
    }
  }

  cancelEdit(id: string): void {
    const index = this.models.findIndex((item) => item._id === id);
    this.editCache[id] = {
      data: { ...this.models[index] },
      edit: false,
    };
    this.updateDisplayedModels();
  }

  deleteRow(id: string): void {
    this.models = this.models.filter((item) => item._id !== id);
    this.modelsService.deleteModel(id).subscribe({
      next: () => {
        delete this.editCache[id];
        this.updateDisplayedModels();
      },
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayedModels();
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    if (this.searchValue) {
      const searchTerms = this.searchValue
        .toLowerCase()
        .split(' ')
        .filter((term) => term.length > 0);
      const filteredModels = this.models.filter((item) => {
        const itemText =
          `${item.brand} ${item.series} ${item.line}`.toLowerCase();
        return searchTerms.every((term) => itemText.includes(term));
      });
      this.displayedModels = filteredModels.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    } else {
      this.updateDisplayedModels();
    }
  }
}
