import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {CadastrarTerapeutaComponent} from './componentes/cadastrar-terapeuta/cadastrar-terapeuta.component';
import {DashboardTerapeutaComponent} from './componentes/dashboard-terapeuta/dashboard-terapeuta.component';
import {DashboardResponsavelComponent} from './componentes/dashboard-responsavel/dashboard-responsavel.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registrar', component: CadastrarTerapeutaComponent},
  {path: 'dashboard-terapeuta', component: DashboardTerapeutaComponent},
  {path: 'dashboard-responsavel', component: DashboardResponsavelComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
