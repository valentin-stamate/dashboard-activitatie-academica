import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientificArticleIsiComponent } from './scientific-article-isi.component';

describe('ScientificArticleIsiComponent', () => {
  let component: ScientificArticleIsiComponent;
  let fixture: ComponentFixture<ScientificArticleIsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScientificArticleIsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientificArticleIsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
