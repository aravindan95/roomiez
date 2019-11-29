import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {
  rooms: any;
  constructor(private http: HttpClient) {
    this.getRooms();
  }
  campus = ['North', 'South', 'East'];
  uri = 'http://localhost:3000';
  getRooms() {
    return this.http.get(`${this.uri}/rooms`).subscribe(data => {
      this.rooms = JSON.stringify(data);
    });
  }
}
