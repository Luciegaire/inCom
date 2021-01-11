import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { PostComponent } from './components/Feed/post/post.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { GenerateCvComponent } from './components/generate-cv/generate-cv.component';
import { OffersListComponent } from './components/offers-list/offers-list.component';
import { ProfileCompanyComponent } from './components/Profile/profile-company/profile-company.component';
import { ProfileCandidateComponent } from './components/Profile/profile-candidate/profile-candidate.component';
import { LoginComponent } from './components/login/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
