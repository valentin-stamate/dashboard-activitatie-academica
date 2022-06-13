import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsers } from './admin-users.component';

describe('AdminComponent', () => {
  let component: AdminUsers;
  let fixture: ComponentFixture<AdminUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsers ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
