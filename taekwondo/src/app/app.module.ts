import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EventoComponent } from './components/evento/evento.component';

import { TipoEventoComponent } from './components/tipo-evento/tipo-evento.component';

import { ExamenComponent } from './components/examen/examen.component';


@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    EventoComponent,
    TipoEventoComponent
    ExamenComponent
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
