import { Component } from '@angular/core';
import { Roommate } from '../roommate';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Remove } from '../remove';

@Component({
  selector: 'app-roommate-form',
  templateUrl: './roommate-form.component.html',
  styleUrls: ['./roommate-form.component.css']
})
export class RoommateFormComponent {
  room: any;
  headers: any;
  map: any;
  id: any;
  message: any;
  overlay: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  model = new Roommate('', '', '', '', null, '', 0, '');
  identifier = new Remove('');
  onSubmit() {
    this.room = JSON.stringify(this.model);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/rooms', this.room, {headers: this.headers}).subscribe((data) => console.log(data));
    this.router.navigate(['map']);
  }

  removeListing() {
    this.id = JSON.stringify(this.identifier);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/retrieve', this.id, {headers: this.headers}).subscribe((data) => {
      this.room = data;
      this.overlay = document.getElementsByClassName('delete-overlay');
      this.overlay[0].innerHTML = '<h3>' + this.room[0].address + '</h3><br><button name="delete" class="btn btn-success (click)="delete()">Delete</button>';
      });
  }
  delete(){
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/delete', this.id, {headers: this.headers}).subscribe((data) => {
      console.log(data);
    });
}}
