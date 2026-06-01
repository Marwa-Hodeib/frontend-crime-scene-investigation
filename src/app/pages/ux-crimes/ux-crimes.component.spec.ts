import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UxCrimesComponent } from './ux-crimes.component';

describe('UxCrimesComponent', () => {
  let component: UxCrimesComponent;
  let fixture: ComponentFixture<UxCrimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UxCrimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UxCrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
