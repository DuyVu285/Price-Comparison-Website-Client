import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrapeService {
  private ScrapeUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  scrapeAllSites() {
    const data = this.http.get(this.ScrapeUrl + '/scrape/all');
    console.log('Received data', data);
    return this.http.get(this.ScrapeUrl + '/scrape/all');
  }
}
