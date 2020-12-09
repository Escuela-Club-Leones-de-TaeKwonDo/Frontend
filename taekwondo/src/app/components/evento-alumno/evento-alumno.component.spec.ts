import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAlumnoComponent } from './evento-alumno.component';

describe('EventoAlumnoComponent', () => {
  let component: EventoAlumnoComponent;
  let fixture: ComponentFixture<EventoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
