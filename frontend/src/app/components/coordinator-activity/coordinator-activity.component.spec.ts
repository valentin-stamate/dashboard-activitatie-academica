import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorActivityComponent } from './coordinator-activity.component';

describe('CoordinatorActivityComponent', () => {
  let component: CoordinatorActivityComponent;
  let fixture: ComponentFixture<CoordinatorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatorActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
