import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DidacticActivityComponent } from './didactic-activity.component';

describe('DidacticActivityComponent', () => {
  let component: DidacticActivityComponent;
  let fixture: ComponentFixture<DidacticActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DidacticActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DidacticActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
