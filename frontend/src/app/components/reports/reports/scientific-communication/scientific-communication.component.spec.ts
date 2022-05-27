import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificCommunicationComponent } from './scientific-communication.component';

describe('ScientificCommunicationComponent', () => {
  let component: ScientificCommunicationComponent;
  let fixture: ComponentFixture<ScientificCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
