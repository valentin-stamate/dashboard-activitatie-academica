import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbalProcessComponent } from './verbal-process.component';

describe('VerbalProcessComponent', () => {
  let component: VerbalProcessComponent;
  let fixture: ComponentFixture<VerbalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbalProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
