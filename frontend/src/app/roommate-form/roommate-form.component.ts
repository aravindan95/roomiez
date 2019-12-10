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
  button: any;
  result: any;
  constructor(private http: HttpClient, private router: Router) {
  }
  model = new Roommate('', '', '', '', null, '', 0, '');
  identifier = new Remove('');
  onSubmit() {
    this.room = JSON.stringify(this.model);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/rooms', this.room, {headers: this.headers}).subscribe((data) => {
      this.id = data;
      this.id = this.id.ops[0]._id;
      this.overlay = document.getElementsByClassName('delete-overlay');
      this.overlay[0].innerHTML = '<h3>Congrats! your listing is added</h3><h3>Listing ID: '
        + this.id + '</h3><h3>Please note it down or copy</h3><br><button id="map" class="btn btn-success">Map</button>';
      this.button = document.getElementById('map');
      this.button.addEventListener('click', () => {
        this.router.navigate(['map']);
      });
    });
  }

  removeListing() {
    this.id = JSON.stringify(this.identifier);
    this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post('http://localhost:3000/retrieve', this.id, {headers: this.headers}).subscribe((data) => {
      this.room = data;
      this.overlay = document.getElementsByClassName('delete-overlay');
      if (this.room.length === 0) {
        this.overlay[0].innerHTML = '<h3> Please enter a correct listing ID </h3>';
      }
      this.overlay[0].innerHTML = '<h3>' + this.room[0].address + '</h3><br><button id="delete" class="btn btn-success">Delete</button>';
      this.button = document.getElementById('delete');
      this.button.addEventListener('click', () => {
        console.log(this.id);
        this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.http.post('http://localhost:3000/delete', this.id, {headers: this.headers}).subscribe((data) => {
          this.result = data;
          if(this.result.deletedCount === 1){
            this.overlay[0].innerHTML = '<h3> Your Listing is removed! Thanks for using UML Roomiez </h3>';
            setTimeout(() => {
              this.router.navigate(['map']);
              }, 3000);
          }
      });
      });
  });
}
}
