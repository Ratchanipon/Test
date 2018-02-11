import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IronmarnComponent } from './ironmarn.component';

describe('IronmarnComponent', () => {
  let component: IronmarnComponent;
  let fixture: ComponentFixture<IronmarnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IronmarnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IronmarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
