import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufacture } from './add-manufacture';

describe('AddManufacture', () => {
  let component: AddManufacture;
  let fixture: ComponentFixture<AddManufacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddManufacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddManufacture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
