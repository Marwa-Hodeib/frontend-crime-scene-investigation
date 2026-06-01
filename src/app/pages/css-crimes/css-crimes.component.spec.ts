import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssCrimesComponent } from './css-crimes.component';

describe('CssCrimesComponent', () => {
  let component: CssCrimesComponent;
  let fixture: ComponentFixture<CssCrimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CssCrimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssCrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
