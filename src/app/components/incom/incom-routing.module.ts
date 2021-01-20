import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { IncomComponent } from './incom.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileCompanyComponent } from './profile/profile-company/profile-company.component';
import {ProfilePageComponent} from './profile/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '', component: IncomComponent, children: [
      { path: 'companies', component: CompaniesListComponent, },
      { path: 'feed', component: FeedComponent, },
      { path: 'offers', component: OffersListComponent, },
      { path: 'profile', component: ProfileComponent, },
      { path: 'profile-page', component: ProfilePageComponent},
      { path: 'profile-company', component: ProfileCompanyComponent, },
      { path: '**', redirectTo: 'feed', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomRoutingModule { }
