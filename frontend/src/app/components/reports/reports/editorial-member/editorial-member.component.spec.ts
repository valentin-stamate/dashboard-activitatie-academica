import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialMemberComponent } from './editorial-member.component';

describe('EditorialMemberComponent', () => {
  let component: EditorialMemberComponent;
  let fixture: ComponentFixture<EditorialMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorialMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
