import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';

// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app-component/app.component';
//import { loginComponent } from './login/login.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

import { ServicioService } from './servicio.service';
import { PersonasComponent } from './personas/personas.component';
import { RespuestasComponent } from './Respuestas/respuestas.component';
import { PreguntaComponent } from './Preguntas/preguntas.component';


const appRoutes: Routes = 
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio'
  },
  /*{
    path: 'Login',
    component: loginComponent,
  },*/
  {
    path: 'Inicio',
    component: MenuInicioComponent,
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// se incluye esto y la coma despues del corchete anterior

  {
    path: 'Catalogo',
    component: CatalogoComponent,   
  },

  {
    path: 'Personal',
    component: PersonasComponent,   
  },

  {
    path: 'Respuestas',
    component: RespuestasComponent,   
  },
  
  {
    path: 'Preguntas',
    component: PreguntaComponent,   
  },

];
//*************************************************************
@NgModule({
  declarations: [
    AppComponent,
    //loginComponent,
    MenuInicioComponent,
    CatalogoComponent,   
    PersonasComponent,  
    RespuestasComponent,
    PreguntaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    HttpClientModule  // <- Agregar la clase
  ],
  
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }