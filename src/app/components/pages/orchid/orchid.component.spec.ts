import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrchidComponent } from './orchid.component';

describe('OrchidComponent', () => {
  let component: OrchidComponent;
  let fixture: ComponentFixture<OrchidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrchidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrchidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
