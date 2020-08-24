import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './_pipes/safe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LivestreamComponent } from './header/livestream/livestream.component';
import { RadiostreamComponent } from './header/radiostream/radiostream.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShowsComponent } from './shows/shows.component';
import { SliderComponent } from './home/slider/slider.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentSingleComponent } from './residents/resident-single/resident-single.component';
import { UpcomingComponent } from './home/upcoming/upcoming.component';
import { PlayerComponent } from './player/player.component';
import { AdspaceComponent } from './home/adspace/adspace.component';
import { BlogrollComponent } from './home/blogroll/blogroll.component';

import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';
import { ShowSingleComponent } from './shows/show-single/show-single.component';
import { ScheduleSingleComponent } from './schedule/schedule-single/schedule-single.component';
import { IframePipe } from './_pipes/iframe.pipe';
import { PrivacyComponent } from './subpages/privacy/privacy.component';
import { AboutComponent } from './subpages/about/about.component';
import { ContactComponent } from './subpages/contact/contact.component';
import { Page404Component } from './subpages/page404/page404.component';
import { UpNextComponent } from './home/up-next/up-next.component';
import { DonateStreamComponent } from './header/donate-stream/donate-stream.component';

// Unused as of 1.2
import { GenresComponent } from './genres/genres.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { ArchiveComponent } from './archive/archive.component';
import { ChatangoComponent } from './header/chatango/chatango.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogrollComponent,
    LivestreamComponent,
    ScheduleComponent,
    ShowsComponent,
    SliderComponent,
    PlayerComponent,
    SafePipe,
    ArchiveComponent,
    HomeComponent,
    RadiostreamComponent,
    GenresComponent,
    FooterComponent,
    ResidentsComponent,
    UpcomingComponent,
    BlogSingleComponent,
    BlogComponent,
    ResidentSingleComponent,
    ShowSingleComponent,
    ScheduleSingleComponent,
    IframePipe,
    PrivacyComponent,
    AboutComponent,
    ContactComponent,
    Page404Component,
    AdspaceComponent,
    UpNextComponent,
    DonateStreamComponent,
    ChatangoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    IframePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
