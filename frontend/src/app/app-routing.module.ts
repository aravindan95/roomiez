
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomFormComponent} from './room-form/room-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoommateFormComponent } from './roommate-form/roommate-form.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'room', component: RoomFormComponent },
  { path: 'roommate', component: RoommateFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomePageComponent, RoomFormComponent, RoommateFormComponent]
