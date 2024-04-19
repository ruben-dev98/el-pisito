import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './utils/api.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselHomeComponent } from './components/carousel-home/carousel-home.component';
import { HeaderFooterComponent } from './components/header-footer/header-footer.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { FooterFooterComponent } from './components/footer-footer/footer-footer.component';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ListHomeComponent } from './components/list-home/list-home.component';
import { ListTipoComponent } from './components/list-tipo/list-tipo.component';
import { AddTipoComponent } from './components/add-tipo/add-tipo.component';
import { EditTipoComponent } from './components/edit-tipo/edit-tipo.component';
import { ListPoblacionComponent } from './components/list-poblacion/list-poblacion.component';
import { AddPoblacionComponent } from './components/add-poblacion/add-poblacion.component';
import { EditPoblacionComponent } from './components/edit-poblacion/edit-poblacion.component';
import { ListProvinciaComponent } from './components/list-provincia/list-provincia.component';
import { AddProvinciaComponent } from './components/add-provincia/add-provincia.component';
import { EditProvinciaComponent } from './components/edit-provincia/edit-provincia.component';
import { ListInmuebleComponent } from './components/list-inmueble/list-inmueble.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { EditInmuebleComponent } from './components/edit-inmueble/edit-inmueble.component';
import { ViewInmueblesComponent } from './components/view-inmuebles/view-inmuebles.component';
import { HeaderCommonComponent } from './components/header-common/header-common.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { FichaInmuebleComponent } from './components/ficha-inmueble/ficha-inmueble.component';
import { CarouselFichaComponent } from './components/carousel-ficha/carousel-ficha.component';
import { EurosPipe } from './pipes/euros.pipe';
import { NoImageDirective } from './directives/no-image.directive';
import { DetailInmuebleComponent } from './components/detail-inmueble/detail-inmueble.component';
import { MetrosCuadradosPipe } from './pipes/metros-cuadrados.pipe';
import { AmuebladoPipe } from './pipes/amueblado.pipe';
import { SiNoPipe } from './pipes/si-no.pipe';
import { ExistPipe } from './pipes/exist.pipe';
import { ListFinderComponent } from './components/list-finder/list-finder.component';
import { FinderComponent } from './components/finder/finder.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CarouselHomeComponent,
    HeaderFooterComponent,
    NavFooterComponent,
    FooterFooterComponent,
    NavMainComponent,
    HomeComponent,
    ErrorComponent,
    ListHomeComponent,
    ListTipoComponent,
    AddTipoComponent,
    EditTipoComponent,
    ListPoblacionComponent,
    AddPoblacionComponent,
    EditPoblacionComponent,
    ListProvinciaComponent,
    AddProvinciaComponent,
    EditProvinciaComponent,
    ListInmuebleComponent,
    PreloaderComponent,
    AddInmuebleComponent,
    EditInmuebleComponent,
    ViewInmueblesComponent,
    HeaderCommonComponent,
    AddImageComponent,
    CommunicationComponent,
    FichaInmuebleComponent,
    CarouselFichaComponent,
    EurosPipe,
    NoImageDirective,
    DetailInmuebleComponent,
    MetrosCuadradosPipe,
    AmuebladoPipe,
    SiNoPipe,
    ExistPipe,
    ListFinderComponent,
    FinderComponent,
    LoginComponent,
    SignInComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ApiInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
