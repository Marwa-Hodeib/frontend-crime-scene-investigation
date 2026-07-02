import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeModelTsComponent } from './crime.model.ts.component';

describe('CrimeModelTsComponent', () => {
  let component: CrimeModelTsComponent;
  let fixture: ComponentFixture<CrimeModelTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrimeModelTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrimeModelTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
