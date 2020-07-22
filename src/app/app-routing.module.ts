import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog/blog-single/blog-single.component';
import { ResidentsComponent } from './residents/residents.component';
import { ResidentSingleComponent } from './residents/resident-single/resident-single.component';
import { ShowsComponent} from './shows/shows.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:title', component: BlogSingleComponent},
  {path: 'residents', component: ResidentsComponent},
  {path: 'residents/:title', component: ResidentSingleComponent},
  {path: 'shows', component: ShowsComponent }
  // {path: 'blog/:id/:title', component: BlogPostComponent},
  // {path: 'livestream', component: LivestreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
