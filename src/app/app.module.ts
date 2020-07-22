import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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

// Unused as of 1.2
import { GenresComponent } from './genres/genres.component';
import { BlogrollComponent } from './blogroll/blogroll.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ArchiveComponent } from './archive/archive.component';
import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { BlogComponent } from './blog/blog.component';



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
    ResidentSingleComponent
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
