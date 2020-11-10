import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { EventoComponent } from './components/evento/evento.component';

const routes: Routes = [
  //NOTA: cambiar este componente cuando tengamos la página de inicio.
  { path: '', component: AlumnoComponent },
  { path: 'alumno', component: AlumnoComponent },
  { path: 'evento', component: EventoComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }