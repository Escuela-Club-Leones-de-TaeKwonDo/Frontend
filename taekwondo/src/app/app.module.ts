import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EventoComponent } from './components/evento/evento.component';
import { ExamenComponent } from './components/examen/examen.component';
import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { EventoAlumnoComponent } from './components/evento-alumno/evento-alumno.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ExamenAlumnoComponent } from './components/examen-alumno/examen-alumno.component';
import { LoginAdministadorComponent } from './components/autenticacion/login-administador/login-administador.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    EventoComponent,
    ExamenComponent,
    TipoEventoComponent,
    MainComponent,
    LoginComponent,
    EventoAlumnoComponent,
    ContactoComponent,
    ExamenAlumnoComponent,
    LoginAdministadorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
