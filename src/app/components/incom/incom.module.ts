import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomComponent } from './incom.component';
import { MenuComponent } from './menu/menu.component'
import {IncomRoutingModule} from './incom-routing.module'
import { PostEditorComponent } from './feed/post-editor/post-editor.component';
import { ProfileCompanyProfileComponent } from './profile/profile-company/profile-company-profile/profile-company-profile.component';
import { ProfileCompanyOffersComponent } from './profile/profile-company/profile-company-offers/profile-company-offers.component';
import { ProfileCompanyAccountsComponent } from './profile/profile-company/profile-company-accounts/profile-company-accounts.component';
import { ProfileCandidateComponent } from './profile/profile-candidate/profile-candidate.component';
import { ProfileCompanyComponent } from './profile/profile-company/profile-company.component';
import { CompanyComponent } from './companies-list/company/company.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './feed/post/post.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { GenerateCvComponent } from './profile/generate-cv/generate-cv.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ProfileInformationsComponent } from './profile/profile-informations/profile-informations.component';
import { ProfileCompanyOffers2Component } from './profile/profile-company/profile-company-offers2/profile-company-offers2.component';
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { FeedComponent } from './feed/feed.component';
import {HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';



export function playerFactory() {
  return import('lottie-web');
}


@NgModule({
  declarations: [
    IncomComponent,
    MenuComponent,
    ProfileComponent,
    FeedComponent,
    PostComponent,
    CompaniesListComponent,
    GenerateCvComponent,
    OffersListComponent,
    ProfileCompanyComponent,
    ProfileCandidateComponent,
    CompanyComponent,
    MenuComponent,
    PostEditorComponent,
    ProfileCompanyProfileComponent,
    ProfileCompanyOffersComponent,
    ProfileCompanyAccountsComponent,
    ProfileCompanyOffers2Component,
    ProfilePasswordComponent,
    ProfileInformationsComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    IncomRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    NgxQRCodeModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class IncomModule { }
