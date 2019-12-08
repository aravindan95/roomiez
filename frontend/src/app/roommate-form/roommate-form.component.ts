import { Component } from '@angular/core';
import { Roommate } from '../roommate';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roommate-form',
  templateUrl: './roommate-form.component.html',
  styleUrls: ['./roommate-form.component.css']
})
export class RoommateFormComponent {
  room: any;
  headers: any;
  map: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  model = new Roommate('', '', '', '', null, '', 0, '');
  onSubmit() {
    this.room = JSON.stringify(this.model);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/rooms', this.room, {headers: this.headers}).subscribe((data) => console.log(data));
    this.router.navigate(['map']);
}}
