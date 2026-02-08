import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaterial } from './add-material';

describe('AddMaterial', () => {
  let component: AddMaterial;
  let fixture: ComponentFixture<AddMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMaterial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
