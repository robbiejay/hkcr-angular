import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { LivestreamComponent } from './livestream/livestream.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'archive', component: ArchiveComponent},
  {path: 'livestream', component: LivestreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
