import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { Config } from '../config';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements AfterViewInit{
  rooms: any;
  i: number;
  length: number;
  addresses: Array<string>;
  marker: Array<any>;
  key: string;
  latlng: any;
  myLatLng: any;
  @ViewChild('gmap', {static: false}) mapElement: any;
  map: google.maps.Map;
  uri = 'http://localhost:3000';
  geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  info: Array<string>;
  infowindow: any;
  config: Config;
  constructor(private http: HttpClient) {
  }
  ngAfterViewInit(): void {
    this.myLatLng = new google.maps.LatLng(42.6553,-71.3247);
    this.map = new google.maps.Map(this.mapElement.nativeElement,{zoom : 15, center: this.myLatLng});
    this.config = new Config('');
    this.key = this.config.key;
    this.addresses = [];
    this.marker = [];
    this.rooms = '';
    this.getRooms().subscribe( (data) => {
      this.rooms = data;
      this.length = this.rooms.length;
      for ( this.i = 0; this.i < this.length; this.i++ ) {
        this.addresses[this.i] = this.rooms[this.i].address;
        this.getLatLng(this.addresses[this.i]).subscribe((data) => {
          this.info = [];
          this.latlng = data;
          this.latlng = this.latlng.results[0].geometry.location;
          this.marker[this.i] = new google.maps.Marker({
            position: this.latlng,
            map: this.map
          });
          this.info[this.i] = '<b>' + this.rooms[this.i].roomType + 'Room</b><br><h3>' + this.rooms[this.i].address +
            '</h3><br><b>Rent: </b>$' + this.rooms[this.i].rent + '<br>' + this.rooms[this.i].details +
            '<br><center><b>Contact</b></center><br>' + this.rooms[this.i].firstName + ' ' +
            this.rooms[this.i].lastName + '<br>' + this.rooms[this.i].mobile + '<br>';
          this.marker[this.i].addListener('click', function () {
            this.infowindow = new google.maps.InfoWindow({ content: this.info[this.i] });
            this.infowindow.open(this.map, this);
          });
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
