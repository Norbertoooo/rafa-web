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
import {FormsModule} from '@angular/forms';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import {AlertComponent} from './componentes/alert/alert.component';
import {AlertService} from './service/alert.service';
import {LoginService} from './service/login.service';
import {CadastrarTerapeutaService} from './service/cadastrar-terapeuta.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {TerapeutaService} from './service/terapeuta.service';

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
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [AlertService, LoginService, CadastrarTerapeutaService, TerapeutaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
