import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './_pipes/safe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { StreamModule } from './header/stream.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Subpage Module

import { PrivacyComponent } from './subpages/privacy/privacy.component';
import { AboutComponent } from './subpages/about/about.component';
import { ContactComponent } from './subpages/contact/contact.component';
import { Page404Component } from './subpages/page404/page404.component';

// Home module

import { HomeComponent } from './home/home.component';
import { SliderComponent } from './home/slider/slider.component';
import { AdspaceComponent } from './home/adspace/adspace.component';

// Schedule Module

import { UpcomingComponent } from './schedule/upcoming/upcoming.component';
import { ScheduleSingleComponent } from './schedule/schedule-single/schedule-single.component';


// Blog Module

import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';
import { BlogrollComponent } from './home/blogroll/blogroll.component';
import { IframePipe } from './_pipes/iframe.pipe';

// Shows Module

import { ShowsComponent } from './shows/shows.component';
import { ShowSingleComponent } from './shows/show-single/show-single.component';
import { PlayerComponent } from './player/player.component';


// Residents Module

import { ResidentsComponent } from './residents/residents.component';
import { ResidentSingleComponent } from './residents/resident-single/resident-single.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogrollComponent,
    ShowsComponent,
    SliderComponent,
    PlayerComponent,
    HomeComponent,
    FooterComponent,
    ResidentsComponent,
    UpcomingComponent,
    BlogSingleComponent,
    BlogComponent,
    BlogrollComponent,
    ResidentSingleComponent,
    ShowSingleComponent,
    ScheduleSingleComponent,
    IframePipe,
    SafePipe,
    PrivacyComponent,
    AboutComponent,
    ContactComponent,
    Page404Component,
    AdspaceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StreamModule
  ],
  providers: [
    IframePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
