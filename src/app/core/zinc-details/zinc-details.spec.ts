import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZincDetails } from './zinc-details';

describe('ZincDetails', () => {
  let component: ZincDetails;
  let fixture: ComponentFixture<ZincDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZincDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZincDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
