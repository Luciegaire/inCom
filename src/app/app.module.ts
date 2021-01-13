import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/feed/post/post.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { GenerateCvComponent } from './components/generate-cv/generate-cv.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { ProfileCompanyComponent } from './components/profile/profile-company/profile-company.component';
import { ProfileCandidateComponent } from './components/profile/profile-candidate/profile-candidate.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/companies-list/company/company.component';
import { MenuComponent } from './components/menu/menu.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { PostEditorComponent } from './components/feed/post-editor/post-editor.component';

//HTTP
import {HttpClientModule} from '@angular/common/http';
import { ProfileCompanyProfileComponent } from './components/profile/profile-company/profile-company-profile/profile-company-profile.component';
import { ProfileCompanyOffersComponent } from './components/profile/profile-company/profile-company-offers/profile-company-offers.component';
import { ProfileCompanyAccountsComponent } from './components/profile/profile-company/profile-company-accounts/profile-company-accounts.component';
import { ProfileCompanyOffers2Component } from './components/profile/profile-company/profile-company-offers2/profile-company-offers2.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FeedComponent,
    PostComponent,
    CompaniesListComponent,
    GenerateCvComponent,
    OffersListComponent,
    ProfileCompanyComponent,
    ProfileCandidateComponent,
    LoginComponent,
    HomeComponent,
    CompanyComponent,
<<<<<<< HEAD
    MenuComponent,
    PostEditorComponent,
=======
    ProfileCompanyProfileComponent,
    ProfileCompanyOffersComponent,
    ProfileCompanyAccountsComponent,
    ProfileCompanyOffers2Component
>>>>>>> viggiano
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
