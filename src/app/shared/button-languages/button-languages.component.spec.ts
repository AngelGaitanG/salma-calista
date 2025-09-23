import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLanguagesComponent } from './button-languages.component';

describe('ButtonLanguagesComponent', () => {
  let component: ButtonLanguagesComponent;
  let fixture: ComponentFixture<ButtonLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLanguagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
