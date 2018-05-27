import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMenagementComponent } from './category-menagement.component';

describe('CategoryMenagementComponent', () => {
  let component: CategoryMenagementComponent;
  let fixture: ComponentFixture<CategoryMenagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMenagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
