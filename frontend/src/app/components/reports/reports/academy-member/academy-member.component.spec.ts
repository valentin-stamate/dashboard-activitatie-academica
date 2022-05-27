import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyMemberComponent } from './academy-member.component';

describe('AcademyMemberComponent', () => {
  let component: AcademyMemberComponent;
  let fixture: ComponentFixture<AcademyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademyMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
