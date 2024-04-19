import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ListTipoComponent } from './components/list-tipo/list-tipo.component';
import { AddTipoComponent } from './components/add-tipo/add-tipo.component';
import { EditTipoComponent } from './components/edit-tipo/edit-tipo.component';
import { ListPoblacionComponent } from './components/list-poblacion/list-poblacion.component';
import { EditPoblacionComponent } from './components/edit-poblacion/edit-poblacion.component';
import { AddPoblacionComponent } from './components/add-poblacion/add-poblacion.component';
import { AddProvinciaComponent } from './components/add-provincia/add-provincia.component';
import { EditProvinciaComponent } from './components/edit-provincia/edit-provincia.component';
import { ListProvinciaComponent } from './components/list-provincia/list-provincia.component';
import { ListInmuebleComponent } from './components/list-inmueble/list-inmueble.component';
import { AddInmuebleComponent } from './components/add-inmueble/add-inmueble.component';
import { EditInmuebleComponent } from './components/edit-inmueble/edit-inmueble.component';
import { ViewInmueblesComponent } from './components/view-inmuebles/view-inmuebles.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { DetailInmuebleComponent } from './components/detail-inmueble/detail-inmueble.component';
import { ListFinderComponent } from './components/list-finder/list-finder.component';
import { adminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"home", component: HomeComponent},
  {path:"add-tipo", component: AddTipoComponent, canActivate:[adminGuard]},
  {path:"add-user", component: AddUserComponent, canActivate:[adminGuard]},
  {path:"add-poblacion", component: AddPoblacionComponent, canActivate:[adminGuard]},
  {path:"add-provincia", component: AddProvinciaComponent, canActivate:[adminGuard]},
  {path:"add-inmueble", component: AddInmuebleComponent, canActivate:[adminGuard]},
  {path:"add-image/:id", component: AddImageComponent, canActivate:[adminGuard]},
  {path:"edit-tipo/:id", component: EditTipoComponent, canActivate:[adminGuard]},
  {path:"edit-user/:id", component: EditUserComponent, canActivate:[userGuard]},
  {path:"edit-poblacion/:id", component: EditPoblacionComponent, canActivate:[adminGuard]},
  {path:"edit-provincia/:id", component: EditProvinciaComponent, canActivate:[adminGuard]},
  {path:"edit-inmueble/:id", component: EditInmuebleComponent, canActivate:[adminGuard]},
  {path:"list-tipos", component: ListTipoComponent, canActivate:[adminGuard]},
  {path:"list-users", component: ListUserComponent, canActivate:[adminGuard]},
  {path:"list-poblaciones", component: ListPoblacionComponent, canActivate:[adminGuard]},
  {path:"list-provincias", component: ListProvinciaComponent, canActivate:[adminGuard]},
  {path:"list-inmuebles", component: ListInmuebleComponent, canActivate:[adminGuard]},
  {path:"list-finder/:pob/:tipo/:op", component: ListFinderComponent},
  //{path:"view-inmuebles", component: ViewInmueblesComponent},
  {path:"detail-inmueble/:id", component: DetailInmuebleComponent},
  {path:"login", component: LoginComponent},
  {path:"sigIn", component: SignInComponent},
  {path:"error", component: ErrorComponent},
  {path:"**", component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
