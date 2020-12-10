import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdministadorComponent } from './login-administador.component';

describe('LoginAdministadorComponent', () => {
  let component: LoginAdministadorComponent;
  let fixture: ComponentFixture<LoginAdministadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdministadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdministadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
