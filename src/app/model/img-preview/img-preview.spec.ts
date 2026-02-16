import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPreview } from './img-preview';

describe('ImgPreview', () => {
  let component: ImgPreview;
  let fixture: ComponentFixture<ImgPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
