import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutActivityComponent } from './without-activity.component';

describe('WithoutActivityComponent', () => {
  let component: WithoutActivityComponent;
  let fixture: ComponentFixture<WithoutActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
