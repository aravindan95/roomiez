import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Room } from '../room';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  room: any;
  headers: HttpHeaders;
  constructor(private http: HttpClient, private router: Router) {
  }
  model = new Room([],0);

  onSubmit() {
      this.room = JSON.stringify(this.model);
      this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.http.post('http://localhost:3000/search', this.room, {headers: this.headers})
          .subscribe((data) => {
            this.room = data;
            this.router.navigate(['map', JSON.stringify(this.room)]);
          });
  }
}
