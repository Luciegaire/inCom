import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesListComponent } from './components/incom/companies-list/companies-list.component';
import { FeedComponent } from './components/incom/feed/feed.component';
import { GenerateCvComponent } from './components/incom/profile/generate-cv/generate-cv.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/incom/menu/menu.component';
import { OffersListComponent } from './components/incom/offers-list/offers-list.component';
import { ProfileComponent } from './components/incom/profile/profile.component';
import { ProfileCompanyComponent } from './components/incom/profile/profile-company/profile-company.component';
import {ProfileCandidateComponent} from './components/incom/profile/profile-candidate/profile-candidate.component';
import {ProfilePasswordComponent} from './components/incom/profile/profile-password/profile-password.component';
import {ProfileInformationsComponent} from './components/incom/profile/profile-informations/profile-informations.component';
import {ProfilePageComponent} from './components/incom/profile/profile-page/profile-page.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'incom',
    loadChildren: () => import('./components/incom/incom.module').then(m => m.IncomModule),canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: 'profile', component: ProfileComponent},
  // { path: 'profile-candidate', component: ProfileCandidateComponent},
  // { path: 'profile-password', component: ProfilePasswordComponent},
  // { path: 'profile-informations', component: ProfileInformationsComponent},
  // { path: 'profile-page', component: ProfilePageComponent},
  // { path: 'feed', component: FeedComponent},
  { path: 'login', component: LoginComponent },
  // { path: 'generate-cv', component: GenerateCvComponent},
  // { path: 'companies-list', component: CompaniesListComponent},
  // { path: 'offers-list', component: OffersListComponent},
  // { path: 'menu', component: MenuComponent},
  // { path: 'profile-company', component: ProfileCompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
