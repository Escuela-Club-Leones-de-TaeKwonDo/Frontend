import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { EventoComponent } from './components/evento/evento.component';
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

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }