import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() product: any;

  
  ngOnInit() {
    this.print();
  }

  ScrollIntoView(divId: string) {
    console.log(divId);
    let element = document.getElementById(divId);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  print(){
    console.log('Received', this.product);
  }
}
