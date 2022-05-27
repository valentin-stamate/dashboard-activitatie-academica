import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsiProceedingsComponent } from './isi-proceedings.component';

describe('IsiProceedingsComponent', () => {
  let component: IsiProceedingsComponent;
  let fixture: ComponentFixture<IsiProceedingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsiProceedingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsiProceedingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
