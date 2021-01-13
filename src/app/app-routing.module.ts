import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { FeedComponent } from './components/feed/feed.component';
import { GenerateCvComponent } from './components/generate-cv/generate-cv.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileCompanyComponent } from './components/profile/profile-company/profile-company.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'login', component: LoginComponent},
  { path: 'generate-cv', component: GenerateCvComponent},
  { path: 'companies-list', component: CompaniesListComponent},
  { path: 'offers-list', component: OffersListComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'profile-company', component: ProfileCompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
