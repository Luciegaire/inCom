import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/incom/profile/profile.component';
import { FeedComponent } from './components/incom/feed/feed.component';
import { PostComponent } from './components/incom/feed/post/post.component';
import { CompaniesListComponent } from './components/incom/companies-list/companies-list.component';
import { GenerateCvComponent } from './components/incom/profile/generate-cv/generate-cv.component';
import { OffersListComponent } from './components/incom/offers-list/offers-list.component';
import { ProfileCompanyComponent } from './components/incom/profile/profile-company/profile-company.component';
import { ProfileCandidateComponent } from './components/incom/profile/profile-candidate/profile-candidate.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/incom/companies-list/company/company.component';

import { MenuComponent } from './components/incom/menu/menu.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostEditorComponent } from './components/incom/feed/post-editor/post-editor.component';
import { LottieModule } from 'ngx-lottie';

//HTTP
import {HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProfileCompanyProfileComponent } from './components/incom/profile/profile-company/profile-company-profile/profile-company-profile.component';
import { ProfileCompanyOffersComponent } from './components/incom/profile/profile-company/profile-company-offers/profile-company-offers.component';
import { ProfileCompanyAccountsComponent } from './components/incom/profile/profile-company/profile-company-accounts/profile-company-accounts.component';

import { ProfilePasswordComponent } from './components/incom/profile/profile-password/profile-password.component';
import { ProfileInformationsComponent } from './components/incom/profile/profile-informations/profile-informations.component';
import { ProfilePageComponent } from './components/incom/profile/profile-page/profile-page.component';
import { SigninComponent } from './components/home/signin/signin.component';
import { SignupCompanieComponent } from './components/home/signup-companie/signup-companie.component';
import { SignupCandidatComponent } from './components/home/signup-candidat/signup-candidat.component';
import { ForgotPasswordComponent } from './components/home/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './services/auth.interceptor';
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


export function playerFactory() {
  return import('lottie-web');
}


@NgModule({
  declarations: [
    AppComponent,
    // ProfileComponent,
    // FeedComponent,
    // PostComponent,
    // CompaniesListComponent,
    // GenerateCvComponent,
    // OffersListComponent,
    // ProfileCompanyComponent,
    // ProfileCandidateComponent,
    LoginComponent,
    HomeComponent,
    SigninComponent,
    SignupCompanieComponent,
    SignupCandidatComponent,
    ForgotPasswordComponent,

    // CompanyComponent,
    // MenuComponent,
    // PostEditorComponent,
    // ProfileCompanyProfileComponent,
    // ProfileCompanyOffersComponent,
    // ProfileCompanyAccountsComponent,
    // ProfileCompanyOffers2Component,
    // ProfilePasswordComponent,
    // ProfileInformationsComponent,
    // ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    SweetAlert2Module
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
