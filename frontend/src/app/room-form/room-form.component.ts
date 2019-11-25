import { Component } from '@angular/core';
import { Room } from '../room';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent {
  campus = ['North', 'South', 'East'];
  model = new Room(this.campus, 400);
  submitted = false;

  onSubmit(){
    this.submitted = true;
  }
}
