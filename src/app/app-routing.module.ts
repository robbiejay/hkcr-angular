import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentSingleComponent } from './residents/resident-single/resident-single.component';
import { ShowsComponent} from './shows/shows.component';
import { ShowSingleComponent } from './shows/show-single/show-single.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleSingleComponent } from './schedule/schedule-single/schedule-single.component';
import { UpcomingComponent } from './home/upcoming/upcoming.component';

import { ShowGuardService as ShowGuard } from './_services/_guards/show-guard.service';
import { ResidentGuardService as ResidentGuard } from './_services/_guards/resident-guard.service';
import { UpcomingGuardService as UpcomingGuard } from './_services/_guards/upcoming-guard.service';
import { BlogGuardService as BlogGuard } from './_services/_guards/blog-guard.service';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'livestream', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:title', component: BlogSingleComponent, canActivate: [BlogGuard]},
  {path: 'residents', component: ResidentsComponent},
  {path: 'residents/:title', component: ResidentSingleComponent, canActivate: [ResidentGuard]},
  {path: 'shows', component: ShowsComponent },
  {path: 'shows/:title', component: ShowSingleComponent, canActivate: [ShowGuard] },
  {path: 'schedule', component: UpcomingComponent },
  {path: 'schedule/:title', component: ScheduleSingleComponent, canActivate: [UpcomingGuard]}
  // {path: 'blog/:id/:title', component: BlogPostComponent},
  // {path: 'livestream', component: LivestreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
