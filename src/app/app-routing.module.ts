import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
//import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
const routes: Routes = [
 // {path: '', component: MenuInicioComponent},
 // {path: '', component: RegisterComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
