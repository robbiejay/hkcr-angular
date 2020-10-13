import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { PostsService } from '../posts.service';
import { HelpersService } from '../helpers.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowGuardService implements CanActivate {

  constructor(private router: Router,
              private _meta: Meta,
              private _title: Title,
              private postsService: PostsService,
              private helpersService: HelpersService) { }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> {

                 const id = route.paramMap.get('id')
                 const title = route.paramMap.get('title')

                 return this.postsService.getSingleShow(title.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()).pipe(
                   map(
                     showData => {

                       this._title.setTitle(showData.title);
                       this._meta.updateTag({ name: 'description', content: showData.content});
                       this._meta.updateTag({ name: 'keywords', content: showData.title + ', mix, ' + JSON.stringify(showData.tags)},"name='keywords'");
                       this._meta.updateTag({ property: 'og:image', content: showData.image_full});
                       this._meta.updateTag({ property: 'og:title', content:showData.title});
                       this._meta.updateTag({ property: 'og:description', content: showData.content});
                            return true;
                     }
                   )
                 )
               }
}
