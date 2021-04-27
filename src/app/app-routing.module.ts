import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CadastrarTerapeutaComponent} from './components/cadastrar-terapeuta/cadastrar-terapeuta.component';
import {DashboardTerapeutaComponent} from './components/dashboard-terapeuta/dashboard-terapeuta.component';
import {DashboardResponsavelComponent} from './components/dashboard-responsavel/dashboard-responsavel.component';
import {SobreComponent} from './components/sobre/sobre.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastrar', component: CadastrarTerapeutaComponent},
  {path: 'dashboard-terapeuta', component: DashboardTerapeutaComponent},
  {path: 'dashboard-responsavel', component: DashboardResponsavelComponent},
  {path: 'sobre-projeto', component: SobreComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
