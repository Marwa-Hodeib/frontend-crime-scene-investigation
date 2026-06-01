import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptCrimesComponent } from './javascript-crimes.component';

describe('JavascriptCrimesComponent', () => {
  let component: JavascriptCrimesComponent;
  let fixture: ComponentFixture<JavascriptCrimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptCrimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptCrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
