import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToomComponent } from './add-toom.component';

describe('AddToomComponent', () => {
  let component: AddToomComponent;
  let fixture: ComponentFixture<AddToomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
