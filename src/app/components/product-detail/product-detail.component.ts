import { ScrollTopComponent } from './../scroll-top/scroll-top.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  description: string =
    'R9 7940HS, RTX 4060, DDR5 16GB, 1TB, 75WHrs, 4S1P, 4-cell Li-ion, 1.3 kg'
  labels: string[] = ['Processor', 'Graphics', 'Memory', 'Storage', 'Battery', 'Weight'];
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];

  ScrollIntoView(divId: string) {
    console.log(divId)
    let element = document.getElementById(divId);
    console.log(element)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}