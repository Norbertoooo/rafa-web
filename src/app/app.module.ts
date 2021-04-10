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
import {AlertaService} from './shared/services/alerta.service';
import {LoginService} from './shared/services/login.service';
import {CadastrarTerapeutaService} from './shared/services/cadastrar-terapeuta.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TerapeutaService} from './shared/services/terapeuta.service';
import {PacienteService} from './shared/services/paciente.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import { ListFilterPipe } from './shared/pipes/list-filter.pipe';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import { AdicionarPacienteModalComponent } from './componentes/dashboard-terapeuta/adicionar-paciente-modal/adicionar-paciente-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VisualizarResponsavelModalComponent } from './componentes/dashboard-terapeuta/visualizar-responsavel-modal/visualizar-responsavel-modal.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResponsavelService} from './shared/services/responsavel.service';
import { SobreComponent } from './componentes/sobre/sobre.component';

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
    AdicionarPacienteModalComponent,
    VisualizarResponsavelModalComponent,
    SobreComponent
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
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AlertaService,
    LoginService,
    CadastrarTerapeutaService,
    TerapeutaService,
    ResponsavelService,
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
