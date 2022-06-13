import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilesComponent } from './admin-files.component';

describe('AdminFilesComponent', () => {
  let component: AdminFilesComponent;
  let fixture: ComponentFixture<AdminFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
