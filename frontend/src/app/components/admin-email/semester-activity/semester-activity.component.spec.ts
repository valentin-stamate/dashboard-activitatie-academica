import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterActivityComponent } from './semester-activity.component';

describe('EmailComponent', () => {
  let component: SemesterActivityComponent;
  let fixture: ComponentFixture<SemesterActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
