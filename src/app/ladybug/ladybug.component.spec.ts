import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadybugComponent } from './ladybug.component';

describe('LadybugComponent', () => {
  let component: LadybugComponent;
  let fixture: ComponentFixture<LadybugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadybugComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadybugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
