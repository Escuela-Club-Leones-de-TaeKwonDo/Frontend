import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EventoAlumnoComponent } from './components/evento-alumno/evento-alumno.component';
import { EventoComponent } from './components/evento/evento.component';
import { ExamenAlumnoComponent } from './components/examen-alumno/examen-alumno.component';
import { ExamenComponent } from './components/examen/examen.component';
import { MainComponent } from './components/main/main.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';

const routes: Routes = [
  //NOTA: cambiar este componente cuando tengamos la página de inicio.
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'evento', component: EventoComponent},
  { path: 'tipo-evento', component: TipoEventoComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'evento-alumno', component: EventoAlumnoComponent },
  { path: 'examen-alumno', component: ExamenAlumnoComponent },
  { path: 'contacto', component: ContactoComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }