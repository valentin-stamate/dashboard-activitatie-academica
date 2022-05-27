import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardNominationComponent } from './award-nomination.component';

describe('AwardNominationComponent', () => {
  let component: AwardNominationComponent;
  let fixture: ComponentFixture<AwardNominationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardNominationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
