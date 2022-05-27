import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReportComponent } from './no-report.component';

describe('NoReportComponent', () => {
  let component: NoReportComponent;
  let fixture: ComponentFixture<NoReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
