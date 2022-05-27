import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificBookComponent } from './scientific-book.component';

describe('ScientificBookComponent', () => {
  let component: ScientificBookComponent;
  let fixture: ComponentFixture<ScientificBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
