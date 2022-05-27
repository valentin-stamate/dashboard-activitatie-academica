import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticleBdiComponent } from './scientific-article-bdi.component';

describe('ScientificArticleBdiComponent', () => {
  let component: ScientificArticleBdiComponent;
  let fixture: ComponentFixture<ScientificArticleBdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificArticleBdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificArticleBdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
