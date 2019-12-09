import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { Config } from '../config';
import { ActivatedRoute } from '@angular/router';
import Marker = google.maps.Marker;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit{
  rooms: any;
  i: number;
  j: number;
  length: number;
  addresses: Array<string>;
  copy: Array<string>;
  marker: Array<Marker>;
  key: string;
  latlng: any;
  myLatLng: any;
  position: any;
  search: any;
  valid: string;
  valid1: string;
  ans: boolean;
  ans1: boolean;
  @ViewChild('gmap', {static: false}) mapElement: any;
  map: google.maps.Map;
  uri = 'http://localhost:3000';
  geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  info: Array<string>;
  infowindow: any;
  config: Config;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }
  ngAfterViewInit(): void {
    this.myLatLng = new google.maps.LatLng(42.6553,-71.3247);
    this.map = new google.maps.Map(this.mapElement.nativeElement,{zoom : 15, center: this.myLatLng});
    this.search = this.route.snapshot.paramMap.get('room');
    this.config = new Config();
    this.key = this.config.key;
    this.addresses = [];
    this.marker = [];
    this.info = [];
    this.infowindow = [];
    this.rooms = '';
    this.j = 0;
    this.getRooms().subscribe( (data) => {
      this.rooms = data;
      if (this.search) {
        this.rooms = JSON.parse(this.search);
      }
      this.length = this.rooms.length;
      for ( this.i = 0; this.i < this.length; this.i++ ) {
        this.addresses[this.i] = this.rooms[this.i].address;
        this.copy = this.addresses;
        this.info[this.i] = '<b><u>' + this.rooms[this.i].roomType + ' Room</u></b><br><h6>' + this.rooms[this.i].address +
          '</h6><br><h6>Rent: </h6>$' + this.rooms[this.i].rent + '<br><br><h6>Details: </h6>' + this.rooms[this.i].details +
          '<br><br><h6>Contact:</h6>' + this.rooms[this.i].firstName + ' ' +
          this.rooms[this.i].lastName + '<br>' + this.rooms[this.i].mobile + '<br>';
        this.getLatLng(this.addresses[this.i]).subscribe((data) => {
          this.latlng = data;
          this.valid = (this.latlng.results[0].address_components[0].long_name
            + ' ' + this.latlng.results[0].address_components[1].long_name).toLowerCase();
          this.valid1 = (this.latlng.results[0].address_components[0].long_name
            + ' ' + this.latlng.results[0].address_components[1].short_name).toLowerCase();
          this.latlng = this.latlng.results[0].geometry.location;
          for ( this.i = 0; this.i < this.length; this.i++ ) {
            this.copy[this.i] = this.copy[this.i].toLowerCase();
            this.ans = this.copy[this.i].includes(this.valid);
            this.ans1 = this.copy[this.i].includes(this.valid);
            if ((this.ans === true) || (this.ans1 === true)) {
              this.j = this.i;
              break;
            }
          }
          this.marker[this.j] = new google.maps.Marker({
            position: this.latlng,
            map: this.map,
            title: this.j.toString()
          });
          this.marker[this.j].addListener('click', () => {
            this.position = event.target;
            this.position = this.position.title;
            this.infowindow = new google.maps.InfoWindow({content: this.info[this.position]});
            this.infowindow.open(this.map, this.marker[this.position]);
          });
          this.j++;
        });
      }
    });
  }
  getRooms() {
    return this.http.get(`${this.uri}/rooms`);
  }

  getLatLng(addr: string) {
      return this.http.get(`${this.geo}` + addr + `&key=` + this.key);
  }
}
