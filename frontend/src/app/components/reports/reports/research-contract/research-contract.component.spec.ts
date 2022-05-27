import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchContractComponent } from './research-contract.component';

describe('ResearchContractComponent', () => {
  let component: ResearchContractComponent;
  let fixture: ComponentFixture<ResearchContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
