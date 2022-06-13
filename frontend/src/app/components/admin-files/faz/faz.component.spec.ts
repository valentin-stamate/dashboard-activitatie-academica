import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazComponent } from './faz.component';

describe('FazComponent', () => {
  let component: FazComponent;
  let fixture: ComponentFixture<FazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
