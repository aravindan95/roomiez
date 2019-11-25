import { Component } from '@angular/core';
import { Roommate } from '../roommate';

@Component({
  selector: 'app-roommate-form',
  templateUrl: './roommate-form.component.html',
  styleUrls: ['./roommate-form.component.css']
})
export class RoommateFormComponent{
  model = new Roommate('', '', '', '', null, 0, '');
  onSubmit(){
   console.log(this.model)
  }

}
