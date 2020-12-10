import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenAlumnoComponent } from './examen-alumno.component';

describe('ExamenAlumnoComponent', () => {
  let component: ExamenAlumnoComponent;
  let fixture: ComponentFixture<ExamenAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
