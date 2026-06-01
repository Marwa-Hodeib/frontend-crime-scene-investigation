import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCrimesComponent } from './angular-crimes.component';

describe('AngularCrimesComponent', () => {
  let component: AngularCrimesComponent;
  let fixture: ComponentFixture<AngularCrimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularCrimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularCrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
