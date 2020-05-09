import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlogrollComponent } from './blogroll/blogroll.component';
import { LivestreamComponent } from './livestream/livestream.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShowsComponent } from './shows/shows.component';
import { SliderComponent } from './slider/slider.component';
import { PlayerComponent } from './player/player.component';
import { SafePipe } from './_pipes/safe.pipe';
import { ArchiveComponent } from './archive/archive.component';
import { HomeComponent } from './home/home.component';


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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
