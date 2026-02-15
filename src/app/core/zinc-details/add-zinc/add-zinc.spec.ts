import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddZinc } from './add-zinc';

describe('AddZinc', () => {
  let component: AddZinc;
  let fixture: ComponentFixture<AddZinc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddZinc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddZinc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
