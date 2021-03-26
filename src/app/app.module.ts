import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {DashboardTerapeutaComponent} from './componentes/dashboard-terapeuta/dashboard-terapeuta.component';
import {DashboardResponsavelComponent} from './componentes/dashboard-responsavel/dashboard-responsavel.component';
import {DadosTerapeutaComponent} from './componentes/dados-terapeuta/dados-terapeuta.component';
import {DadosResponsavelComponent} from './componentes/dados-responsavel/dados-responsavel.component';
import {LoginComponent} from './componentes/login/login.component';
import {CadastrarTerapeutaComponent} from './componentes/cadastrar-terapeuta/cadastrar-terapeuta.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import {AlertComponent} from './layout/alert/alert.component';
import {AlertService} from './services/alert.service';
import {LoginService} from './services/login.service';
import {CadastrarTerapeutaService} from './services/cadastrar-terapeuta.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TerapeutaService} from './services/terapeuta.service';
import {PacienteService} from './services/paciente.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import { ListFilterPipe } from './pipes/list-filter.pipe';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import { AdicionarPacienteModalComponent } from './componentes/dashboard-terapeuta/adicionar-paciente-modal/adicionar-paciente-modal.component';

registerLocaleData(localePtBr, 'pt-BR');

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardTerapeutaComponent,
    DashboardResponsavelComponent,
    DadosTerapeutaComponent,
    DadosResponsavelComponent,
    LoginComponent,
    CadastrarTerapeutaComponent,
    AlertComponent,
    ListFilterPipe,
    AdicionarPacienteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    AlertService,
    LoginService,
    CadastrarTerapeutaService,
    TerapeutaService,
    PacienteService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
