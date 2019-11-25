import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoommateFormComponent } from './roommate-form.component';

describe('RoommateFormComponent', () => {
  let component: RoommateFormComponent;
  let fixture: ComponentFixture<RoommateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoommateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoommateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
